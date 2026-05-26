/**
 * correoArgentinoService.js
 * Integración con la API de Correo Argentino para la generación de envíos (Alta de orden) y rótulos.
 *
 * Variables de entorno sugeridas (se pueden configurar en Railway):
 *   CORREO_ARG_API_URL   — URL de la API (https://api.correoargentino.com.ar/paqar)
 *   CORREO_ARG_API_KEY   — API Key
 *   CORREO_ARG_AGREEMENT — Número de acuerdo (agreement)
 */

const axios = require('axios');

// Valores por defecto seguros para los parámetros
const BASE_URL = process.env.CORREO_ARG_API_URL || 'https://api.correoargentino.com.ar/paqar';
const API_KEY = process.env.CORREO_ARG_API_KEY;
const AGREEMENT = process.env.CORREO_ARG_AGREEMENT;

const isConfigured = () => !!(API_KEY && AGREEMENT);

/**
 * Crea una orden en Correo Argentino
 * @param {Object} order - Objeto de la orden (de la DB)
 * @returns {Promise<string>} trackingNumber
 */
const crearOrden = async (order) => {
  if (!isConfigured()) {
    console.warn('[Correo Argentino] Faltan credenciales (CORREO_ARG_API_KEY o CORREO_ARG_AGREEMENT). Se saltea la creación de orden.');
    return null;
  }

  // Parsear la dirección del cliente (separar calle y altura si es posible, o mandar todo a calle)
  const dir = order.direccionEnvio || '';
  let streetName = dir;
  let streetNumber = 'S/N';
  let zipCode = '1000'; // Default CP
  let state = 'C'; // Default provincia (CABA)
  let cityName = 'Ciudad Autónoma de Buenos Aires';

  // Intento simple de extracción de datos, se asume que el usuario ingresó algo válido
  // Lo ideal sería que el frontend envíe estos datos por separado, pero hacemos un "best effort"
  const match = dir.match(/^(.*?)\s+(\d+)\s*(.*)$/);
  if (match) {
    streetName = match[1].trim();
    streetNumber = match[2].trim();
  } else if (dir.length > 0) {
    streetName = dir;
  }

  // Medidas predeterminadas (acordadas con el usuario)
  const dimensiones = {
    height: "23",
    width: "14",
    depth: "3"
  };
  const productWeight = "300"; // 300gr

  const body = {
    "agreement": AGREEMENT,
    "deliveryType": "homeDelivery", // Entrega a domicilio por defecto
    "order": {
      "senderData": {
        "id": "EdicionesFelicitas", // Id genérico para el remitente
        "businessName": "Ediciones Felicitas",
        "email": "contacto@edicionesfelicitas.com.ar",
        "address": {
          "streetName": "Viamonte", // Calle por defecto o a configurar
          "streetNumber": "1500", // Número por defecto
          "cityName": "CABA",
          "state": "C",
          "zipCode": "1174" // CP del cliente indicado por el usuario
        }
      },
      "shippingData": {
        "name": order.nombreComprador,
        "email": order.emailComprador,
        "phoneNumber": order.telefonoComprador || "0000000000",
        "address": {
          "streetName": streetName.substring(0, 100) || "Sin calle",
          "streetNumber": streetNumber,
          "cityName": cityName,
          "state": state,
          "zipCode": zipCode
        }
      },
      "parcels": [
        {
          "dimensions": dimensiones,
          "productWeight": productWeight,
          "productCategory": "Libros",
          "declaredValue": Math.round(Number(order.total)).toString()
        }
      ]
    }
  };

  try {
    const response = await axios.post(`${BASE_URL}/v1/orders`, body, {
      headers: {
        'Authorization': `Apikey ${API_KEY}`,
        'agreement': AGREEMENT,
        'Content-Type': 'application/json'
      }
    });

    if (response.data && response.data.trackingNumber) {
      console.log(`[Correo Argentino] Orden creada exitosamente. TN: ${response.data.trackingNumber}`);
      return response.data.trackingNumber;
    } else {
      console.error('[Correo Argentino] Respuesta exitosa pero sin trackingNumber:', response.data);
      return null;
    }
  } catch (error) {
    console.error('[Correo Argentino] Error al crear orden:', error.response?.data || error.message);
    throw new Error('No se pudo crear el envío en Correo Argentino.');
  }
};

/**
 * Obtiene el rótulo (PDF en base64) de una orden
 * @param {string} trackingNumber 
 * @returns {Promise<string>} base64 string
 */
const obtenerRotulo = async (trackingNumber) => {
  if (!isConfigured()) return null;

  const body = [
    {
      "trackingNumber": trackingNumber
    }
  ];

  try {
    const response = await axios.post(`${BASE_URL}/v1/labels`, body, {
      headers: {
        'Authorization': `Apikey ${API_KEY}`,
        'agreement': AGREEMENT,
        'Content-Type': 'application/json'
      },
      params: {
        'labelFormat': '10x15'
      }
    });

    if (response.data && response.data.length > 0 && response.data[0].status === "OK") {
      return response.data[0].fileBase64;
    } else {
      console.error('[Correo Argentino] Error al obtener rótulo:', response.data);
      throw new Error(response.data[0]?.result || 'Error al descargar etiqueta');
    }
  } catch (error) {
    console.error('[Correo Argentino] Error al pedir rotulo:', error.response?.data || error.message);
    throw new Error('No se pudo obtener la etiqueta de envío.');
  }
};

module.exports = { isConfigured, crearOrden, obtenerRotulo };
