import {VictoryAxis, VictoryBar, VictoryChart, VictoryTheme} from "victory";
import React from "react";

const data = [
  {
    model: 'led',
    minimumBatteryLife: 2.5,
    lumens: 600,
  },
  {
    model: 'gas',
    minimumBatteryLife: 5,
    lumens: 800,
  },
  {
    model: 'ila',
    minimumBatteryLife: 8.5,
    lumens: 1400,
  },
]

export const IlaSpecs = React.memo(function IlaSpecs(props: any) {
  return (
    <div className={`flex flex-col h-full w-full p-7 ${props.active ? 'opacity-100' : 'opacity-50'} ${props.active ? 'blur-0' : 'blur-sm'} transition-all duration-700`}>
      <div className="h-2/5 mb-7 flex flex-row justify-evenly">
        <div className="w-1/2 flex flex-col items-center">
          <h1 className="mt-3 text-white">Battery Life at Max Brightness</h1>

          <VictoryChart
            theme={VictoryTheme.grayscale}
            domainPadding={{ x: 10 }}
          >
            <VictoryBar
              horizontal
              barWidth={40}
              cornerRadius={{ topLeft: 10, topRight: 10 }}
              style={{
                data: { fill: "#c43a31" },
                labels: {
                  fontSize: 17,
                  fill: "#fefefe"
                },
              }}
              x={d => d.model}
              y={d => d.minimumBatteryLife}
              data={data}
              labels={({ datum }) => `${datum.minimumBatteryLife}`}

            />
            <VictoryAxis style={{ tickLabels: { fill: '#fefefe', fontSize: 17 }}}/>
          </VictoryChart>
          </div>
        <div className="w-1/2 flex flex-col items-center">
          <h1 className="mt-3 text-white">Maximum Brightness (lumens)</h1>
          <VictoryChart
            name="Maximum Brightness (lumens)"
            theme={VictoryTheme.grayscale}
            domainPadding={{ x: 10 }}
          >
            <VictoryBar
              horizontal
              barWidth={40}
              cornerRadius={{ topLeft: 10, topRight: 10 }}
              style={{
                data: { fill: "#c43a31" },
                labels: {
                  fontSize: 17,
                  fill: "#fefefe"
                },
              }}
              x={d => d.model}
              y={d => d.lumens}
              data={data}
              labels={({ datum }) => `${datum.lumens}`}
            />
            <VictoryAxis style={{ tickLabels: { fill: '#fefefe', fontSize: 17 }}}/>
          </VictoryChart>
          </div>
      </div>
      <div className="h-1/2 w-full flex flex-col items-center">
        <h1 className="text-white pb-7">Waterproof Trial (Rose Valley Falls)</h1>
        <div>
          <img className="object-cover h-full w-full rounded-2xl" src="/ila-lantern/resilience.gif" />
        </div>
      </div>
    </div>
  )
})
