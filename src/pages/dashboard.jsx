import { useEffect, useState } from 'react'
import axios from 'axios'
import DashboardWidget from 'components/dashboard/DashboardWidget'

const Dashboard = () => {

  const [orders, setOrders] = useState([]);
  const [prods, setProds] = useState([]);

  const getOrders = async () => {
    try {
      let res1 = await axios.get('http://localhost:8000/orders');
      setOrders(res1.data);
    } catch ( err) {
      console.log(err);
    }
  }

  const getProducts = async () => {
    try {
      let res2 = await axios.get('http://localhost:8000/products');
      setProds(res2.data);
    } catch ( err) {
      console.log(err);
    }
  }


  useEffect(() => {
    getOrders();
    getProducts();
  }, [])

  console.log(orders);
  console.log(prods);
  console.log('salam')

  const greenOrders = orders.filter((order) => {
    return (order.status === 1)
  })

  console.log(greenOrders);

  const income = greenOrders.map((greenOrder) => {
    return (greenOrder.price);
  })

  console.log(income);

  let totalIncome = 0
  for (let i in income) {
    totalIncome += income[i];
  }

  console.log(totalIncome);

  return (
    <>
      <div className="row">
        <div className="col-12 col-sm-6 col-lg-4">
          <DashboardWidget
            title="تعداد محصولات"
            icon="tshirt"
            value={prods.length}
            color="bg-primary"
            testId="products-count"
          />
        </div>
        <div className="col-12 col-sm-6 col-lg-4">
          <DashboardWidget
            title="درآمد کل"
            icon="coins"
            value={`${totalIncome} تومان`}
            color="bg-warning"
            testId="total-incomes"
          />
        </div>
        <div className="col-12 col-sm-6 col-lg-4">
          <DashboardWidget
            title="تعداد سفارشات موفق"
            icon="shopping-cart"
            value={greenOrders.length}
            color="bg-danger"
            testId="successful-orders-count"
          />
        </div>
      </div>
    </>
  )
}

export default Dashboard
