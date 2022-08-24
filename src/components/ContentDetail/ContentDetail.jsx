import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { CategoryContext } from "../context/CategoryContext";

import ReactStars from "react-stars";

export default function ContentDetail() {
  const { setContentSelec, contentSelec } = useContext(CategoryContext);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://630404fb761a3bce77e2380a.mockapi.io/contents/${id}`)
      .then((resp) => {
        setContentSelec(resp.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <div className="containerCenter">
      <div className="container_item_category">
        <div
          style={{
            backgroundImage: `url("${contentSelec.img}")`,
            backgroundPosition: "center center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",

            position: "absolute",
            top: " -126px",
            width: "100%",
            top: "0",
            left: "0",
          }}
        >
          <div className="card_select">
            <div className="item_card">
              <img src={contentSelec.img} alt="Placeholder" />
            </div>

            <div className="container_info">
              <h1>{contentSelec.title}</h1>
              <p>{contentSelec.description}</p>
              <div className="container_rating">
                <dir>
                  <p>RATING :</p>
                </dir>
                <div>
                  <ReactStars
                    size={30}
                    count={5}
                    isHalf={false}
                    value={
                      (Math.floor(Math.random() * (5 - +1) + 5) * 50) / 100
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
