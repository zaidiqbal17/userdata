
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import './SecondPage.css';

interface Post {
  id: number;
  title: string;
  body: string;
}

const SecondPage: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userDetails = localStorage.getItem('userDetails');
    if (!userDetails) {
      alert('You must enter your details before accessing this page.');
      navigate('/');
    } else {
      fetchData();
    }
  }, [navigate]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch data.');
      setLoading(false);
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 150, flex: 1 },
    { field: 'body', headerName: 'Body', width: 150, flex: 2 },
  ];

  const handleRowClick = (params: any) => {
    navigate(`/details/${params.id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <div className="content">
        <h1>Welcome to the second page!</h1>
        <p>This page is accessible only after providing your details.</p>
        <h2>Posts:</h2>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid 
            rows={posts} 
            columns={columns} 
            pageSize={10} 
            onRowClick={handleRowClick} 
          />
        </div>
      </div>
    </div>
  );
};

export default SecondPage;

