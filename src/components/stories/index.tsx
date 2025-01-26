import * as React from "react";
import { Input } from "../ui/input";
import { CiSearch } from "react-icons/ci";
import img from "../../assets/images/dw1.jpg";
import img2 from "../../assets/images/dw2.jpg";
import img3 from "../../assets/images/dw3.jpg";
import img4 from "../../assets/images/dw4.jpg";
// import img5 from "../../assets/images/courier11.png";
import img6 from "../../assets/images/dw6.png";
import img7 from "../../assets/images/dw7.png";
// import img8 from "../../assets/images/dw8.png";
// import img9 from "../../assets/images/dw9.png";
import img0 from "../../assets/images/dw0.png";
interface IStoriesProps {}

const Stories: React.FunctionComponent<IStoriesProps> = () => {
  const stories = [img, img7, img2, img3, img4, img0, img6];
  return (
    <div>
      <h2 className="text-red-400 text-2xl font-bold mt-12 md:hidden text-center">
        <span className="text-red-400">Loui</span>
        <span>Gram</span>
      </h2>
      <div className="relative w-[90%] md:w-[60%] m-auto ">
        <Input placeholder="search" className=" " />
        <button className="text-2xl absolute top-1 right-0">
          <CiSearch />
        </button>
      </div>
      <div>
        <h2 className="text-start mt-4 font-bold text-xl">Stories</h2>
        <div className="flex items-center md:gap-4  gap-2 mt-4">
          {stories.map((pic, index) => (
            <div className="w-10 h-10 lg:w-20 lg:h-20 md:w-14 md:h-14 rounded-full border border-4 border-gray-800 m-auto">
              <img
                src={pic}
                alt={index.toString()}
                className=" w-full h-full rounded-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stories;
