import { facebook, instagram, twitter } from "../Assets/icon";

const Footer = () => {
    return (
      <div className="footer mt-20">
        <div className=" bg-gray-900">
          <div className="max-w-2xl mx-auto text-white py-10">
            <div className="text-center">
              <img
                className="h-10  items-center border w-auto ml-80 -mt-3 mb-6"
                src="/images/logo.png"
                alt="Your Company"
              />
              <h3 className="text-3xl mb-3">
                "Authentic Handicrafts Crafted with Love"{" "}
              </h3>
              <p> "Browse Our Collection"</p>
              <div className="flex justify-center my-10"></div>
            </div>
            <div className="mt-28 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
              <p className="order-2 md:order-1 mt-8 md:mt-0">
                {" "}
                &copy; 2023 All Rights Ready{" "}
              </p>
              <div className="order-1 md:order-2">
                <span className="px-2 text-xl">{facebook} Facebook</span>
                <span className="px-2 text-xl border-l">{twitter} twitter</span>
                <span className="px-2 text-xl border-l">
                  {instagram} instagram
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
 
export default Footer;