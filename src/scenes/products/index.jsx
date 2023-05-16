import React, { useState } from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  CircularProgress,
  Grid,
} from '@mui/material';
// import Header from "components/Header";
import { useGetProductsQuery } from 'state/api';

const Product = ({ _id, name, description, price, rating, category, supply, stat }) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        width: '100%',
        minHeight: '100%',
        backgroundImage: 'none',
        backgroundColor: theme.palette.background.alt,
        borderRadius: '0.55rem',
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} gutterBottom>
          {category}
        </Typography>
        <Typography variant='h5' component='div'>
          {name}
        </Typography>
        <Typography sx={{ mb: '1.5rem' }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} precision={0.5} readOnly />

        <Typography variant='body2'>{description}</Typography>
      </CardContent>
      <CardActions>
        <Button variant='primary' size='small' onClick={() => setIsExpanded(!isExpanded)}>
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout='auto'
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {_id ?? 'N/A'}</Typography>
          <Typography>Supply Left: {supply ?? 'N/A'}</Typography>
          <Typography>Yearly Sales This Year: {stat[0]?.yearlySalesTotal ?? 'N/A'}</Typography>
          <Typography>
            Yearly Units Sold This Year: {stat[0]?.yearlyTotalSoldUnits ?? 'N/A'}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = () => {
  const { data, isLoading, error } = useGetProductsQuery();
  if (error) {
    return <Typography variant='h6'>{'Account: ' + error?.data ?? 'N/A'}</Typography>;
  }
  return (
    <Box m='1.5rem 2.5rem'>
      {/* <Header title="PRODUCTS" subtitle="See your list of products." /> */}
      {data || !isLoading ? (
        <Grid container spacing={2}>
          {data.map((data, i) => (
            <Grid item key={data?._id} xs={12} sm={6} md={4} lg={3} sx={{ width: '100%' }}>
              <Product
                _id={data?._id}
                name={data?.name}
                description={data?.description}
                price={data?.price}
                rating={data?.rating}
                category={data?.category}
                supply={data?.supply}
                stat={data?.stat}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '1rem' }}>
          <CircularProgress />
          <Typography variant='h6'>Loading...</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Products;
