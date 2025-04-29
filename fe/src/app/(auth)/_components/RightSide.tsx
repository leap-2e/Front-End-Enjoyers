const RightSide = () => {
  return (
    <div className="w-1/2 h-screen bg-amber-400 flex justify-center items-center">
      <div className="space-y-10">
        <img
          className="w-3/5 place-self-center"
          src="/assets/illustration.svg"
          alt="illustration"
        />
        <div className="space-y-3 text-center">
          <h1 className="text-2xl font-bold">Fund your creative work</h1>
          <p className="text-base font-normal">
            Access support. Start a membership. Setup a shop. It's easier <br />
            than you think.
          </p>
        </div>
      </div>
    </div>
  );
};

export { RightSide };
