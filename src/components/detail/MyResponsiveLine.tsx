// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { ResponsiveLine } from '@nivo/line';

const data = [
  {
    id: 'japan',
    data: [
      {
        x: 'plane',
        y: 134,
      },
      {
        x: 'helicopter',
        y: 236,
      },
      {
        x: 'boat',
        y: 166,
      },
      {
        x: 'train',
        y: 292,
      },
      {
        x: 'subway',
        y: 194,
      },
      {
        x: 'bus',
        y: 73,
      },
      {
        x: 'car',
        y: 246,
      },
    ],
  },
];

const MyResponsiveLine = () => (
  <ResponsiveLine
    data={data}
    margin={{ top: 10, right: 30, bottom: 30, left: 30 }}
    xScale={{ type: 'point' }}
    yScale={{
      type: 'linear',
      min: 'auto',
      max: 'auto',
      stacked: true,
      reverse: false,
    }}
    yFormat=" >-.2f"
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
    legends={[
      {
        anchor: 'top-right',
        direction: 'column',
        justify: false,
        translateX: 60,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: 'top-to-bottom',
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 1,
        symbolSize: 8,
        symbolShape: 'circle',
        symbolBorderColor: 'rgba(0, 0, 0, .5)',
        itemTextColor: '#ffffff',
        effects: [
          {
            on: 'hover',
            style: {
              itemBackground: 'rgba(0, 0, 0, .03)',
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
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
