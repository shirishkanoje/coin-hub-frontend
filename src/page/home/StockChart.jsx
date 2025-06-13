import { Button } from '@/components/ui/button';
import { fetchMarketChart } from '@/State/Coin/Action';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';

const timeseries = [
  { keyword: "DIGITAL_CURRENCY_DAILY", key: "Time Series (Daily)", lable: "1 Day", value: 1 },
  { keyword: "DIGITAL_CURRENCY_WEEKLY", key: "Weekly Time Series", lable: "1 Week", value: 7 },
  { keyword: "DIGITAL_CURRENCY_MONTHLY", key: "Monthly Time Series", lable: "1 Month", value: 30 },
  { keyword: "DIGITAL_CURRENCY_YEARLYLY", key: "Yearly Time Series", lable: "1 Year", value: 365 },
];

const StockChart = ({ coinId }) => {
  const dispatch = useDispatch();
  const { coin } = useSelector((store) => store);

  const [activeLable, setActiveLable] = useState(timeseries[0]);

  const searies = [
    {
      data: coin.marketChart.data,
    },
  ];

  const options = {
    chart: {
      id: "area-datetime",
      type: "area",
      height: 350,
      zoom: {
        autoScaleYaxis: true,
      },
      background: "transparent",
      toolbar: {
        show: false,
      },
    },
    theme: {
      mode: 'dark',
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "datetime",
      tickAmount: 6,
      labels: {
        style: {
          colors: "#000", // Set black color for x-axis labels
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#000", // Set black color for y-axis labels
        },
      },
    },
    colors: ["#7fdbff"], // green accent
    markers: {
      colors: ["#fff"],
      strokeColor: "#fff",
      size: 0,
      strokeWidth: 1,
      style: "hollow",
    },
    tooltip: {
      theme: "dark",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
    grid: {
      borderColor: "#334155", // dark border
      strokeDashArray: 4,
      show: true,
    },
  };

  const handleActiveLable = (value) => {
    setActiveLable(value);
  };

  useEffect(() => {
    dispatch(fetchMarketChart({ coinId, days: activeLable.value, jwt: localStorage.getItem("jwt") }));
  }, [dispatch, coinId, activeLable]);

  return (
    <div>
      {/* Custom Range Buttons */}
      <div className="space-x-3 mb-4">
        {timeseries.map((item) => (
          <Button
            key={item.lable}
            onClick={() => handleActiveLable(item)}
            className={`rounded-full px-4 py-2 text-sm transition-all
              ${activeLable.lable === item.lable
                ? "bg-black text-white border border-white"
                : "bg-white/10 text-black hover:bg-white/20"}`}  // Change hover color and text color to black
          >
            {item.lable}
          </Button>
        ))}
      </div>

      <div id="chart-timelines">
        <ReactApexChart
          options={options}
          series={searies}
          height={450}
          type="area"
        />
      </div>

      {/* Frosted Text and Background */}
      <div className="mt-6 p-4 bg-white bg-opacity-20 backdrop-blur-md text-black rounded-lg">
        <h3 className="text-lg font-semibold">Chart Data</h3>
        <p className="text-base">This chart represents the data for {activeLable.lable}.</p>
      </div>
    </div>
  );
};

export default StockChart;
