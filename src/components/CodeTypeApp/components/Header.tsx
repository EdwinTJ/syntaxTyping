import { ColorPalette } from "../../../types/types";

interface HeaderProps {
  colors: ColorPalette;
}

const Header = ({ colors }: HeaderProps) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold" style={{ color: "#3d4852" }}>
        <span style={{ color: colors.correct }}>Code</span>Type
      </h1>
      <p className="text-gray-600 mt-2">
        Improve your coding speed with typing exercises
      </p>
    </div>
  );
};

export default Header;
