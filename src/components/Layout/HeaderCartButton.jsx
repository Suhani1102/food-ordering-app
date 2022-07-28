import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../contexts/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnAnimation, setBtnAnimation] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const noOfCartItems = items.reduce((currNum, item) => {
    return currNum + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnAnimation ? classes.bump : ""}`;

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setBtnAnimation(true);

    const timer = setTimeout(() => {
      setBtnAnimation(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{noOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
