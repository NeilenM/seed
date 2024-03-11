// import React from 'react';
import { Grid } from '@mui/material';
// import MainTable from 'pages/table/MainTable';
// import MainTable from 'table/MainTable'; 

// import EcommerceDataCard from 'components/cards/statistics/EcommerceDataCard';
// import EcommerceDataChart from '../../components/cards/statistics/EcommerceDataChart';
// import { useTheme } from '@mui/material/styles';
// import { Typography } from '@mui/material';
// import { ArrowUp, Wallet3 } from 'iconsax-react';

const SamplePage = () => {
  // const theme = useTheme();

  return (
    <Grid container>
      <Grid item xs={12} sm={6} lg={3}>
        {/* <MainTable /> */}
        {/* <EcommerceDataCard
          title="All Earnings"
          count="$3000"
          iconPrimary={<Wallet3 />}
          percentage={
            <Typography color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ArrowUp size={16} style={{ transform: 'rotate(45deg)' }} /> 30.6%
            </Typography>
          }
        >
          <EcommerceDataChart color={theme.palette.primary.main} />
        </EcommerceDataCard> */}
        {/* <MainTable/> */}
      </Grid>
    </Grid>
  );
};

export default SamplePage;
