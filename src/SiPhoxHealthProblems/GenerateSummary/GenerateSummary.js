import "./GenerateSummary.css";
import React from "react";

const users = [
  { id: 1, name: "Alice", age: 30 },
  { id: 2, name: "Bob", age: 25 },
  { id: 3, name: "Charlie", age: 35 },
];

const products = [
  { id: 101, name: "Product A", price: 50 },
  { id: 102, name: "Product B", price: 100 },
  { id: 103, name: "Product C", price: 75 },
];

const orders = [
  { id: 1001, userId: 1, productId: 101, quantity: 2 },
  { id: 1002, userId: 2, productId: 102, quantity: 1 },
  { id: 1003, userId: 1, productId: 103, quantity: 3 },
];

function preProcessUsers(users) {
  return users.reduce((acc, user) => {
    acc[user.id] = { name: user.name, age: user.age };
    return acc;
  }, {});
}

function preProcessProducts(products) {
  return products.reduce((acc, product) => {
    acc[product.id] = { name: product.name, price: product.price };
    return acc;
  }, {});
}

const usersObject = preProcessUsers(users);
const productsObject = preProcessProducts(products);

const generateOrderSummary = ({ orders, productsObject, usersObject }) => {
  return orders.map((order) => {
    const user = usersObject[order.userId];
    const product = productsObject[order.productId];
    return {
      orderId: order.id,
      user: user,
      product: product,
      total: product.price * order.quantity,
    };
  });
};

export const Summary = () => {
  const [body, setBody] = React.useState({});

  React.useEffect(() => {
    setBody(generateOrderSummary({ productsObject, orders, usersObject }));
  }, []);

  return (
    <div className="container">
      <pre>{JSON.stringify(body, null, 2)}</pre>
    </div>
  );
};

export default Summary;
