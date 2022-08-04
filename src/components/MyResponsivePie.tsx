// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/pie
import { ResponsivePie } from '@nivo/pie';

const data: object[] = [
  {
    id: 'A포트폴리오',
    label: 'A포트폴리오',
    value: 270,
  },
  {
    id: 'java',
    label: 'java',
    value: 160,
  },
  {
    id: 'elixir',
    label: 'elixir',
    value: 26,
  },
  {
    id: 'haskell',
    label: 'haskell',
    value: 80,
  },
  {
    id: 'make',
    label: 'make',
    value: 184,
  },
  {
    id: 'mak1e',
    label: 'make',
    value: 184,
  },
  {
    id: 'mak2e',
    label: 'make',
    value: 184,
  },
  {
    id: 'mak3e',
    label: 'make',
    value: 184,
  },
  {
    id: 'mak4e',
    label: 'make',
    value: 184,
  },
  {
    id: 'mak5e',
    label: 'make',
    value: 184,
  },
];

const MyResponsivePie = () => (
  <ResponsivePie
    // height={'300px'}
    data={data}
    margin={{ top: 8, right: 0, bottom: 8, left: 0 }}
    innerRadius={0.3}
    padAngle={1}
    cornerRadius={3}
    colors={{ scheme: 'nivo' }}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{
      from: 'color',
      modifiers: [['darker', 0.2]],
    }}
    sortByValue
    arcLabel={(e) => `${e.value} %`}
    enableArcLinkLabels={false}
    arcLabelsSkipAngle={20}
    arcLabelsTextColor="black"
    defs={[
      {
        id: 'dots',
        type: 'patternDots',
        background: 'inherit',
        color: 'rgba(255, 255, 255, 0.3)',
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: 'lines',
        type: 'patternLines',
        background: 'inherit',
        color: 'rgba(255, 255, 255, 0.3)',
        rotation: -45,
        lineWidth: 4,
        spacing: 10,
      },
    ]}
    fill={[
      {
        match: {
          id: 'make',
        },
        id: 'lines',
      },
      {
        match: {
          id: 'java',
        },
        id: 'dots',
      },
    ]}
    // 범례 설정
    legends={[
      {
        anchor: 'top-right',
        direction: 'column',
        justify: false,
        translateX: 10,
        translateY: 0,
        itemsSpacing: 4,
        itemWidth: 100,
        itemHeight: 14,
        itemTextColor: '#fff',
        itemDirection: 'left-to-right',
        itemOpacity: 1,
        symbolSize: 12,
        symbolShape: 'circle',
      },
    ]}
    isInteractive={false}
  />
);

export default MyResponsivePie;
