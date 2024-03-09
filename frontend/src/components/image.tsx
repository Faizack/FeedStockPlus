interface Props {
    text?: string;
  }
  
  export const Logo = ({ text = "Kigreen" }: Props): JSX.Element => {
    return (
      <div>
        <div>
          <div className="ellipse" />
          <div className="div" />
          <div className="ellipse-2" />
          <div className="ellipse-3" />
          <div className="ellipse-4" />
          <div className="ellipse-5" />
          <div className="ellipse-6" />
          <div className="rectangle" />
          <div className="kigreen">{text}</div>
        </div>
      </div>
    );
  };
  