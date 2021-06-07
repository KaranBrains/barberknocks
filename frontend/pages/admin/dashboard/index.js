import dynamic from 'next/dynamic';
const Sidebar = dynamic(() => import('../../../shared/sidebar/sidebar'), { ssr: false, loading: () => <div class="main-loader-div">
  <div class="loader">Loading...</div>
</div> });
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function Dashboard() {
    const state1 = {
        options: {
          chart: {
            id: "basic-bar",
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
          },
        },
        series: [
          {
            name: "series-1",
            data: [30, 40, 45, 50, 49, 60, 70, 91],
          },
        ],
      };
    
      const state2 = {
        options: {
          chart: {
            id: "basic-bar",
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
          },
          stroke: {
            curve: "smooth",
          },
        },
        series: [
          {
            name: "series-1",
            data: [30, 40, 45, 50, 49, 60, 70, 91],
          },
        ],
      };

    return(
        <div>
        <Sidebar />
        <div className="conatiner my-5">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-5 col-md-12 col-sm-12 col-12 pl-lg-0 padding-left-mobile ml-2">
              <div className="chart-space mb-0 py-0">
                <h2>New Users</h2>
                <Chart
                  options={state1.options}
                  series={state2.series}
                  type="line"
                />
              </div>
            </div>
            <div className="col-lg-5 col-md-12 col-sm-12 col-12 pl-lg-0 padding-left-mobile ml-2">
              <div className="chart-space mb-0 py-0">
                <h2>Payments</h2>
                <Chart
                  options={state1.options}
                  series={state2.series}
                  type="area"
                />
              </div>
            </div>
            <div className="col-lg-5 col-md-12 col-sm-12 col-12 pl-lg-0 padding-left-mobile ml-2">
              <div className="chart-space mb-0 py-0">
                <h2>Traffic</h2>
                <Chart
                  options={state1.options}
                  series={state2.series}
                  type="heatmap"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
  