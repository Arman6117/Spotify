"use client";

import * as RadixSlider from "@radix-ui/react-slider";

interface SliderProps {
  onChange: (value: number) => void;
  value: number;
}

const Slider: React.FC<SliderProps> = ({ onChange, value = 1 }) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };
  return (
    <RadixSlider.Root
      className="
            relative 
            touch-none
            flex 
            select-none
            w-full 
            h-10 
            items-center"
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.1}
      aria-label="Volume"
    >
      <RadixSlider.Track className="bg-neutral-600 relative grow rounded-full h-[3px]">
        <RadixSlider.Range className="absolute bg-white rounded-full h-full " />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
};

export default Slider;
