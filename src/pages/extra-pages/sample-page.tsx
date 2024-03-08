import { useTheme } from '@mui/material/styles';
import { Grid, Typography } from '@mui/material';

// project-import
import EcommerceDataCard from 'components/cards/statistics/EcommerceDataCard';
import EcommerceDataChart from '../../components/cards/statistics/EcommerceDataChart';

// assets
import { ArrowUp, Wallet3 } from 'iconsax-react';

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => {
  const theme = useTheme();

  return (
    <Grid container>
      <Grid item xs={12} sm={6} lg={3}>
        <EcommerceDataCard
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
        </EcommerceDataCard>
      </Grid>
    </Grid>
  );
};

export default SamplePage;