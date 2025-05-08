import React, { Fragment } from "react";
import Slide1 from "../../Assets/Carousel/Slide 1.png";
import Slide2 from "../../Assets/Carousel/Slide 2.png";
import Slide3 from "../../Assets/Carousel/Slide 3.png";
import Slide4 from "../../Assets/Carousel/Slide 4.png";
import Carousel from "./Carousel";
import Men from "../../Assets/Categories/Men.png";
import Child from "../../Assets/Categories/Child.png";
import Women from "../../Assets/Categories/Women.png";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import "../../Styles/Home.css";
import OccasionCard from "./OccasionCard";
import PopularList from "../Home/PopularList";
import PersonaliseList from "./PersonaliseList";
import { MdLockOutline } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlinePayment } from "react-icons/md";
import { MdOutlineLocalOffer } from "react-icons/md";
import offer from "../../Assets/Popular/offer.jpg";
import MetaData from "../Reausable/Topnavbar/MetaData";
import { Link } from "react-router-dom";


function Userhome() {
  let slides = [Slide1, Slide2, Slide3, Slide4];

  return (
    <Fragment>
      <MetaData title={`Welcome`} />
      <div className="w-[70%] m-auto py-5 ">
        <Carousel slides={slides} autoSlideInterval={10000} />
      </div>
      <div className="flex items-center justify-center">
        <div className="py-2">
          <span className="font-rubik font-semibold text-2xl ">Categories</span>
        </div>
      </div>
      <div className="pt-2 pb-8 flex items-center justify-evenly flex-wrap gap-5 ">
        <Link className="" to={"/products"}>
          <img src={Men} alt="Men Items" className="w-32 rounded-full " />
        </Link>
        <Link className="" to={"/products"}>
          <img src={Child} alt="Child Items" className="w-32 rounded-full " />
        </Link>
        <Link className="" to={"/products"}>
          <img src={Women} alt="Women Items" className="w-32 rounded-full " />
        </Link>
        <Link to={"/products"}>
          <button className="flex items-center flex-col my-auto h-full justify-between ">
            <MdOutlineKeyboardDoubleArrowRight className="scale-90 hover:scale-105 ease-in duration-500 hover:text-purple-600 text-gray-500 text-3xl" />
            <span className="text-[12px] font-bold font-inter ">View All</span>
          </button>
        </Link>
      </div>

      <div className="pt-2 pb-8">
        <div className="py-4 flex items-center justify-center">
          <span className="font-semibold font-rubik text-2xl">Occasions</span>
        </div>
        <OccasionCard className="" />
      </div>

      <div className="py-2">
        <div className="py-4 flex items-center justify-center flex-col">
          <span className="text-sm font-semibold text-yellow-500">
            Top Selling Products for you
          </span>
          <span className="font-rubik font-semibold text-2xl">
            Top Selling Products
          </span>
          <span className="font-rubik text-gray-700 text-wrap">
            Discover our specially curated selection of unique gifts, perfect
            for any occasion
          </span>
        </div>
        <span className="flex flex-col items-center pb-8">
          <PopularList />
          <Link to={"/products"}>
            <button className="font-futura mt-2 border-opacity-50 border py-2 px-16 bg-orange-500 text-white cursor-pointer transition duration-300 ease-linear hover:border-black hover:bg-orange-600">
              View all Proucts
            </button>
          </Link>
        </span>
      </div>

      <div className="py-2">
        <div className="py-4 flex items-center justify-center flex-col">
          <span className="text-sm font-semibold text-yellow-500">
            Trending Products
          </span>
          <span className="font-rubik font-semibold text-2xl">
            Personalized
          </span>
          <span className="font-rubik text-gray-700 text-wrap">
            A personalized gift adds a unique and meaningful touch, turning any
            occasion into a memorable celebration.
          </span>
        </div>
        <span className="flex flex-col items-center pb-10">
          <PersonaliseList />
          <Link to={"/products"}>
            <button className="font-futura mt-2 border-opacity-50 border py-2 px-16 bg-orange-500 text-white cursor-pointer transition duration-300 ease-linear hover:border-black hover:bg-orange-600">
              View all Proucts
            </button>
          </Link>
        </span>
      </div>

      <div className="flex flex-wrap font-rubik gap-64 items-start justify-center py-2">
        <span className=" shadow-card xl:flex-center hidden">
          <img src={offer} alt="offer" className="w-80" />
        </span>
        <span>
          <h2 className="font-semibold text-2xl">
            Valentine Sale Up to 50% Off
          </h2>
          <p></p>
          <span className="flex flex-col gap-5 text-lg py-4">
            <span className="flex items-center gap-5 ">
              <MdLockOutline className="text-4xl h-12 w-12 shadow-sm p-[13px] rounded-full bg-pink-400/75 " />
              <p>Quality Product</p>
            </span>
            <span className="flex items-center gap-5">
              <TbTruckDelivery className="text-4xl h-12 w-12 shadow-sm p-[13px] rounded-full bg-yellow-400/75" />
              <p>Fast Delivery</p>
            </span>
            <span className="flex items-center gap-5">
              <MdOutlinePayment className="text-4xl h-12 w-12 shadow-sm p-[13px] rounded-full bg-green-400/75 " />
              Easy Payment Method
            </span>
            <span className="flex items-center gap-5">
              <MdOutlineLocalOffer className="text-4xl h-12 w-12 shadow-sm p-[13px] rounded-full bg-red-400/75 " />
              Get Offers
            </span>
          </span>
        </span>
      </div>
    </Fragment>
  );
}

export default Userhome;
