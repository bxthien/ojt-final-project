const API_URL = 'https://provinces.open-api.vn/api/?depth=2';

/**
 *
 * @returns {Promise<unknown>}
 */
export const fetchLocationData = async (): Promise<unknown> => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching location data:', error);
    throw error;
  }
};

export default API_URL;
