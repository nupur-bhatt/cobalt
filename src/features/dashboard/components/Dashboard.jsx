import { Grid, Card, CardContent, Box } from '@mui/material';
import '../style/Dashboard.css';
import LineChartWidget from '../components/LineChartWidget';
import BarChartWidget from '../components/BarChartWidget';
import DoughnutWidget from '../components/DoughnutWidget';
import SparklineWidget from '../components/SparklineWidget';
import BatteryWidget from '../components/BatteryWidget';
import NotificationPanel from '../components/NotificationPanel';
import TabLayout from '../components/TabLayout';

export default function Dashboard() {
  return (
    <Grid container direction="row" spacing={2}>
      
      <Grid container direction="column" spacing={2}>
        <Grid container direction="row" spacing={2}>
          <Grid size={{xl:6}}>
            <BarChartWidget />
          </Grid>
          <Grid size={{xl:6}}>
            <DoughnutWidget />
          </Grid>
        </Grid>
        <Grid container direction="row" >
          <Grid size={{xl:12}}>
            <TabLayout />
          </Grid>
        </Grid>
      </Grid>

      <Grid container direction="column" spacing={2}>
        <Grid >
          <BatteryWidget />
        </Grid>
        <Grid >
          <SparklineWidget />
        </Grid>
        <Grid >
          
        </Grid>
      </Grid>

    </Grid>
  );
}
