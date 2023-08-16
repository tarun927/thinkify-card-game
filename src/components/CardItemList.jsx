import { CardItem } from "./CardItem";
import GameData from "../app.mock";
import { useEffect, useState } from "react";

export const CardItemList = () => {
  const [cardList, setCardList] = useState([...GameData]);
  const [isLast, setIsLast] = useState({ id: 0, isPair: false });

  const onClickHandler = (currentId) => {
    let newCardList = [...cardList];
    let idx = newCardList.findIndex((el) => el.id == currentId);
    newCardList[idx].isOpen = true;
    console.log(newCardList);
    setCardList([...newCardList]);

    if (!isLast.isPair) {
      setIsLast({ ...isLast, id: newCardList[idx].id, isPair: true });
    } else {
      let prevIdx = newCardList.findIndex((el) => el.id == isLast.id);
      console.log(newCardList[prevIdx], newCardList[idx]);
      setIsLast({ ...isLast, id: newCardList[idx].id, isPair: false });

      if (newCardList[prevIdx].pic != newCardList[idx].pic) {
        setTimeout(() => {
          newCardList[idx].isOpen = false;
          newCardList[prevIdx].isOpen = false;
          console.log(newCardList);
          setCardList([...newCardList]);
        }, 400);
      }
    }
  };

  return (
    <div className="card-item-list">
      {cardList.map((item) => {
        return (
          <CardItem
            key={item.id}
            id={item.id}
            image={item.pic}
            onClick={onClickHandler}
            isOpen={item.isOpen}
          ></CardItem>
        );
      })}
    </div>
  );
};
