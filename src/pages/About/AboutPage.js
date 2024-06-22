const AboutPage = () => {
    return (
      <div className="AboutPage">
        <div className="Common">
          <img
            className="-pt-5"
            src="./images/3.png"
            alt="error"
            style={{ height: "550px" }}
          ></img>
        </div>
        <div className="our mission ">
          <div className="mx-auto my-20 max-w-2xl sm:px-6  lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-2 aspect-w-3 hidden border-double border-4 border-black-900 rounded-lg lg:block">
              <img
                src="./images/ourmission.jpg"
                alt="error"
                className="h-full w-full max-w-2xl object-cover object-center  rounded-lg"
              />
            </div>
            <div className="mx-3 max-w-4xl bg-purple-700 px-4 rounded-lg ">
              <div className="space-y-6">
                <h3 className="text-3xl tracking-tight mt-5 font-bold text-white">
                  OUR MISSION
                </h3>
                <p className="text-2xl text-white mt-5">
                  Our mission is to promote the artistry and craftsmanship of
                  talented artisans from around the world. We aim to provide a
                  platform where these creators can showcase their work, share
                  their stories, and connect with a community that appreciates
                  the value of handmade creations. By choosing HandiHues, you
                  are supporting independent artisans and helping to preserve
                  traditional crafting techniques.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="ou value">
          <img
            className="-pt-5 ml-2 rounded-lg"
            src="./images/ourvalues.png"
            alt="error"
            style={{ height: "550px" }}
          ></img>
          <div className="h-30 bg-gradient-to-r from-purple-800 to-purple-500 m-2 p-10 px-20 rounded-lg">
            <p className="text-2xl text-white mt-5">
              <span className="text-3xl font-bold"> Creativity:</span> We
              celebrate the creativity and innovation of artisans who pour their
              heart and soul into their work.
            </p>
            <p className="text-2xl text-white mt-5">
              <span className="text-3xl font-bold"> Authenticity:</span> We
              value the authenticity of handmade items, where each piece
              reflects the personal touch and unique style of its creator.
            </p>
            <p className="text-2xl text-white mt-5">
              <span className="text-3xl font-bold">Community:</span> We strive
              to build a community of artisans and customers who share a passion
              for handmade artistry and sustainable living.
            </p>
            <p className="text-2xl text-white mt-5 ">
              <span className="text-3xl font-bold"> Quality:</span> We are
              dedicated to offering high-quality, beautifully crafted items that
              bring joy and inspiration to your life.
            </p>
          </div>
        </div>
        <div className=" ml-10  grid grid-cols-2 gap-x-10 my-20 mx-5 gap-y-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          <div className="aspect-h-3 aspect-w-0   w-full  overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img
              src="images/block1.png"
              alt="error"
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          </div>

          <div className="aspect-h-3   w-full  aspect-w-3 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img
              src="images/block2.png"
              alt="error"
              className="h-full  object-cover object-center group-hover:opacity-75"
            />
          </div>
          <div className="aspect-h-3   w-full  aspect-w-3 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img
              src="images/4.png"
              alt="error"
              className="h-full  object-cover object-center group-hover:opacity-75"
            />
          </div>
          <div className="aspect-h-3 aspect-w-3  w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img
              src="images/block3.png"
              alt="error"
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          </div>
        </div>
        <div className="thankyou m-5 rounded-lg">
          <img
            className="-pt-5 rounded-lg"
            src="./images/thankyou.png"
            alt="error"
            style={{ height: "550px" }}
          ></img>
        </div>
      </div>
    );
}
 
export default AboutPage;

