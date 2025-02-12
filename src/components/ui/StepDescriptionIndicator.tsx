interface props {
  currentIndex: number;
  descriptions: string[];
}

interface IndicatorProps {
  description: string;
  last: boolean;
  index: number
}

function SelectedIndicator({ description, last, index }: IndicatorProps) {
  return (
    <li className="flex items-center text-blue-600 dark:text-blue-500">
      <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
        {index}
      </span>
      {description}
      <svg
        className="w-3 h-3 ms-2 sm:ms-4 "
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 12 10"
      >
        {!last && (
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m7 9 4-4-4-4M1 9l4-4-4-4"
          />
        )}
      </svg>
    </li>
  );
}

function UnSelectedIndicator({ description, last, index }: IndicatorProps) {
  return (
    <li className="flex items-center">
      <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
        {index}
      </span>
      {description}
      <svg
        className="w-3 h-3 ms-2 sm:ms-4 "
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 12 10"
      >
        {!last && (
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m7 9 4-4-4-4M1 9l4-4-4-4"
          />
        )}
      </svg>
    </li>
  );
}

function StepDescriptionIndicator({
  descriptions,
  currentIndex,
}: props): JSX.Element {
  return (
    <ol className="flex items-center w-full justify-center space-x-2 text-sm font-medium text-center text-gray-500  border-gray-200 rounded-lg dark:text-gray-400 sm:text-base dark:border-gray-700 sm:space-x-4 ">
      {descriptions.map((description, index) => {
        if (index === currentIndex) {
          return (
            <div key={index}>
              <SelectedIndicator
                description={description}
                last={index === descriptions.length - 1}
                index={index + 1}
              />
            </div>
          );
        }

        return (
          <div key={index}>
            <UnSelectedIndicator
              description={description}
              last={index === descriptions.length - 1}
              index={index + 1}
            />
          </div>
        );
      })}
    </ol>
  );
}

export default StepDescriptionIndicator;
