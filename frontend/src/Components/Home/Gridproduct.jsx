import React from "react";
import frame from "../../Assets/Best Sellar/Frame.png";
import photo from "../../Assets/Best Sellar/photo.png";
import bird from "../../Assets/Best Sellar/bird.png";
import puzzle from "../../Assets/Best Sellar/puzzle.jpg";
import card from "../../Assets/Best Sellar/card.png";
import infinite from "../../Assets/Best Sellar/infinite.png";
import qube from "../../Assets/Personalized/qube.png";
import led from "../../Assets/Personalized/led.png";
import embroidary from "../../Assets/Personalized/embraydory.png";

function Gridproduct() {
  return (
    <div>
      <div className="flex justify-around gap-3 mx-4">
        <div className="w-1/2">
          <div className="flex items-center justify-center">
            <div className="under-ani1 py-2">
              <span className="font-poppins xl:text-lg hover:text-sky-500 uppercase ani-text font-bold">
                Best seller
              </span>
            </div>
          </div>

          <div class="p-3 grid grid-cols-3 gap-3">
            <div class="row-span-2">
              <img
                src={card}
                alt="Card Gift"
                srcset=""
                className="rounded-md"
              />
            </div>
            <img
              src={bird}
              alt="Bird Design"
              srcset=""
              className="rounded-md"
            />
            <img
              src={frame}
              alt="Lighting Photo frame"
              srcset=""
              className="rounded-md"
            />
            <div class="row-span-7 ">
              <img
                src={photo}
                alt="Photos Group"
                srcset=""
                className="rounded-md"
              />
            </div>
            <div class="row-span-6 ">
              <img src={puzzle} alt="" srcset="" className="rounded-md" />
            </div>
            <div class="row-span-5 ">
              <img src={infinite} alt="" srcset="" className="rounded-md" />
            </div>
          </div>
        </div>

        <div className="w-1/2">
          <div className="flex items-center justify-center">
            <div className="under-ani1 py-2">
              <span className="font-poppins xl:text-lg hover:text-sky-500 uppercase ani-text font-bold">
                Personalized
              </span>
            </div>
          </div>

          <div class="p-3 grid grid-cols-3 gap-3">
            <div class="row-span-2">
              <img src={card} alt="" srcset="" className="rounded-md" />
            </div>
            <img src={led} alt="" srcset="" className="rounded-md" />
            <img src={qube} alt="" srcset="" className="rounded-md" />
            <div class="row-span-7 ">
              <img src={photo} alt="" srcset="" className="rounded-md" />
            </div>
            <div class="row-span-6 ">
              <img src={bird} alt="" srcset="" className="rounded-md" />
            </div>
            <div class="row-span-5 ">
              <img src={embroidary} alt="" srcset="" className="rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gridproduct;
