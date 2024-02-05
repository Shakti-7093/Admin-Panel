import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from "axios";

function SalesChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/products").then((res) => setData(res.data));
    }, [])
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 30,
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
    )
}

export default SalesChart