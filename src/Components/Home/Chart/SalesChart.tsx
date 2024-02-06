// import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    ComposedChart,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { fetchProduct } from '../../../Store/functions/Product';
import { AppDispatch, RootState } from '../../../Store/Store';

// const fetchData = async () => {
//     const response = await axios.get('http://localhost:3000/products');
//     console.log(response.data);
//     return response.data;
// };

// const data =await fetchData();


function SalesChart() {
        const dispatch = useDispatch<AppDispatch>();
        const data = useSelector((state: RootState) => state.product.products);

        useEffect(() => {
            dispatch(fetchProduct());
        }, [dispatch]);

        return (
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="title" scale="band" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="price" fill="#8884" stroke="#8884d8" />
                    <Bar dataKey="stock" barSize={20} fill="#8595a4" />
                    {/* <Line type="monotone" dataKey="rating" stroke="#ff7300" />
                    <Scatter dataKey="discountPercentage" fill="red" /> */}
                </ComposedChart>
            </ResponsiveContainer>
        );
}

export default SalesChart;