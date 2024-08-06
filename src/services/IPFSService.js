import { create } from 'ipfs-http-client';

const ipfs = create({ url: 'http://localhost:5001' });

export const addDataToIPFS = async (data) => {
  try {
    const result = await ipfs.add(JSON.stringify(data));
    return result.path; // This is the CID
  } catch (error) {
    console.error('Error adding data to IPFS:', error);
    throw error;
  }
};

export const getDataFromIPFS = async (cid) => {
  try {
    const stream = ipfs.cat(cid);
    let data = '';

    for await (const chunk of stream) {
      data += new TextDecoder().decode(chunk);
    }

    console.log("Raw data fetched from IPFS:", data);
    return JSON.parse(data);
  } catch (error) {
    console.error('Error fetching data from IPFS:', error);
    throw error;
  }
};
