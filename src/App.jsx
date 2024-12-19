import { ResponsiveLine } from "@nivo/line";

const getData = [
  {
    id: "japan",
    color: "hsl(347, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 48,
      },
      {
        x: "helicopter",
        y: 104,
      },
      {
        x: "boat",
        y: 242,
      },
      {
        x: "train",
        y: 26,
      },
      {
        x: "subway",
        y: 281,
      },
      {
        x: "bus",
        y: 157,
      },
      {
        x: "car",
        y: 172,
      },
      {
        x: "moto",
        y: 76,
      },
      {
        x: "bicycle",
        y: 265,
      },
      {
        x: "horse",
        y: 148,
      },
      {
        x: "skateboard",
        y: 106,
      },
      {
        x: "others",
        y: 37,
      },
    ],
  },
  {
    id: "france",
    color: "hsl(253, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 144,
      },
      {
        x: "helicopter",
        y: 83,
      },
      {
        x: "boat",
        y: 246,
      },
      {
        x: "train",
        y: 78,
      },
      {
        x: "subway",
        y: 248,
      },
      {
        x: "bus",
        y: 222,
      },
      {
        x: "car",
        y: 299,
      },
      {
        x: "moto",
        y: 244,
      },
      {
        x: "bicycle",
        y: 89,
      },
      {
        x: "horse",
        y: 65,
      },
      {
        x: "skateboard",
        y: 44,
      },
      {
        x: "others",
        y: 30,
      },
    ],
  },
  {
    id: "us",
    color: "hsl(26, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 227,
      },
      {
        x: "helicopter",
        y: 8,
      },
      {
        x: "boat",
        y: 218,
      },
      {
        x: "train",
        y: 190,
      },
      {
        x: "subway",
        y: 213,
      },
      {
        x: "bus",
        y: 59,
      },
      {
        x: "car",
        y: 82,
      },
      {
        x: "moto",
        y: 286,
      },
      {
        x: "bicycle",
        y: 151,
      },
      {
        x: "horse",
        y: 22,
      },
      {
        x: "skateboard",
        y: 189,
      },
      {
        x: "others",
        y: 195,
      },
    ],
  },
  {
    id: "germany",
    color: "hsl(85, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 30,
      },
      {
        x: "helicopter",
        y: 187,
      },
      {
        x: "boat",
        y: 278,
      },
      {
        x: "train",
        y: 178,
      },
      {
        x: "subway",
        y: 242,
      },
      {
        x: "bus",
        y: 209,
      },
      {
        x: "car",
        y: 256,
      },
      {
        x: "moto",
        y: 91,
      },
      {
        x: "bicycle",
        y: 95,
      },
      {
        x: "horse",
        y: 189,
      },
      {
        x: "skateboard",
        y: 270,
      },
      {
        x: "others",
        y: 34,
      },
    ],
  },
  {
    id: "norway",
    color: "hsl(18, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 162,
      },
      {
        x: "helicopter",
        y: 82,
      },
      {
        x: "boat",
        y: 142,
      },
      {
        x: "train",
        y: 171,
      },
      {
        x: "subway",
        y: 45,
      },
      {
        x: "bus",
        y: 142,
      },
      {
        x: "car",
        y: 142,
      },
      {
        x: "moto",
        y: 239,
      },
      {
        x: "bicycle",
        y: 167,
      },
      {
        x: "horse",
        y: 86,
      },
      {
        x: "skateboard",
        y: 296,
      },
      {
        x: "others",
        y: 147,
      },
    ],
  },
];

const App = () => {
  return (
    <div style={{ width: "80%", height: 500, margin: "0 auto" }}>
      <ResponsiveLine
        data={getData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "transportation",
          legendOffset: 36,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "count",
          legendOffset: -40,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};
export default App;
