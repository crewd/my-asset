// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { ResponsiveLine } from '@nivo/line';
import { LineChartDataType } from '../../types/chart';

const MyResponsiveLine = ({ data }: { data: LineChartDataType[] }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 15, right: 15, bottom: 30, left: 40 }}
    xScale={{ type: 'point' }}
    yScale={{
      type: 'linear',
      min: 'auto',
      max: 'auto',
      stacked: true,
      reverse: false,
    }}
    colors="#fff"
    axisTop={null}
    axisRight={null}
    pointSize={8}
    pointColor={{ from: 'color', modifiers: [] }}
    pointBorderWidth={2}
    pointBorderColor="rgba(255,255,255,.3)"
    pointLabelYOffset={-12}
    useMesh
    animate
    enableCrosshair={false}
    enableGridX={false}
    tooltip={({ point }) => {
      const style = `p-[12px] bg-secondary rounded-lg border-2 border-primary shadow-lg font-bold text-white`;
      return (
        <div className={style} style={{ color: point.serieColor }}>
          <span>{point.data.yFormatted.toLocaleString()}원</span>
        </div>
      );
    }}
    theme={{
      textColor: '#fff',
    }}
  />
);

export default MyResponsiveLine;
