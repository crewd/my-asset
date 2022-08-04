// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/pie
import { ResponsivePie } from '@nivo/pie';
import { ChartDataType } from '../../types/myStock';

const MyResponsivePie = ({ data }: { data: ChartDataType[] }) => (
  <ResponsivePie
    // height={'300px'}
    data={data}
    margin={{ top: 30, right: 0, bottom: 10, left: 0 }}
    innerRadius={0.3}
    padAngle={1}
    cornerRadius={3}
    colors={{ scheme: 'category10' }}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{
      from: 'color',
      modifiers: [['darker', 0.2]],
    }}
    sortByValue
    enableArcLabels={false}
    enableArcLinkLabels={false}
    tooltip={({ datum: { id, value, color } }) => {
      const style = `p-[12px] bg-secondary rounded-lg border-2 border-primary shadow-lg font-bold`;
      return (
        <div className={style} style={{ color }}>
          <span>
            {id}: {value.toLocaleString()}원
          </span>
        </div>
      );
    }}
    // 범례 설정
    legends={[
      {
        anchor: 'top',
        direction: 'row',
        justify: false,
        translateX: 10,
        translateY: -20,
        itemsSpacing: 4,
        itemWidth: 100,
        itemHeight: 0,
        itemTextColor: '#fff',
        itemDirection: 'left-to-right',
        itemOpacity: 1,
        symbolSize: 12,
        symbolShape: 'circle',
      },
    ]}
    isInteractive
  />
);

export default MyResponsivePie;
