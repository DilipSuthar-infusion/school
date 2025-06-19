import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
    Tooltip
  } from 'recharts';
  
  const data = [
    { name: 'Students', value: 400 },
    { name: 'Teachers', value: 120 },
    { name: 'Parents', value: 200 },
  ];
  
  const COLORS = ['#4F46E5', '#10B981', '#F59E0B'];
  
  const projectGraph = () => {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md mx-auto">
        <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">
          User Role Distribution
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                paddingAngle={5}
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };
  
  export default projectGraph;
  