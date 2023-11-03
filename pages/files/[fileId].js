import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import LoginWrapper from '../LoginWrapper';
import { useRouter } from 'next/router';
import axios from 'axios';
import { ApiUrl } from '@/utils/BaseUrl';
import SingleFile from '@/components/files/SingleFile/SingleFile';

const Files = () => {
  const router = useRouter();
  const fileId = router.query.fileId;
  const [fileData, setFileData] = useState([]); // Initialize as an empty array
  const url = `${ApiUrl}/api/files/${fileId}`;

  const getFileData = async () => {
    try {
      const response = await axios.get(url);
      console.log(response.data.filesData);
      setFileData(response.data.filesData); // Set it as an array
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    if (fileId) {
      getFileData();
    }
  }, [fileId]);

  return (
    <LoginWrapper>
      <Layout>
        <SingleFile fileData={fileData} />
      </Layout>
    </LoginWrapper>
  );
}

export default Files;
