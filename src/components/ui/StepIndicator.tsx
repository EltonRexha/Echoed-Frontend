interface props {
  stepsAmount: number;
  currentIndex: number;
}

function StepIndicator({ stepsAmount, currentIndex }: props): JSX.Element {
  return <>{Array.from({ length: stepsAmount }).map((_, index) => {
    if(index === currentIndex){
        return (
          <div
            key={index}
            className="w-3 h-3 rounded-full bg-gray-200 border-4 border-purple-shade-300"
          ></div>
        );
    }

    return (
      <div key={index} className="w-2 h-2 rounded-full bg-gray-200 "></div>
    );
  })}</>;
}

export default StepIndicator;
