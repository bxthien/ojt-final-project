const API_URL = 'https://provinces.open-api.vn/api/?depth=3';

export interface Ward {
  name: string;
  code: number;
}

export interface District {
  name: string;
  code: number;
  wards: Ward[];
}

export interface Province {
  name: string;
  code: number;
  districts: District[];
}

/**
 * Fetch location data (provinces, districts, wards) from the API.
 * @returns {Promise<Province[]>} List of provinces with detailed districts and wards.
 */
export const fetchLocationData = async (): Promise<Province[]> => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching location data:', error);
    throw error;
  }
};
