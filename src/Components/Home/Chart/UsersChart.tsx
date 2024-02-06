import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const fetchData = async () => {
    const response = await axios.get('http://localhost:3000/products');
    console.log(response.data);
    return response.data;
};

const data = await fetchData();

function UsersChart() {
    return (
        <ResponsiveContainer width="100%" height="100%">

            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="stock" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default UsersChart;