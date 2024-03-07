import LogoNav from "./logoNav";

interface prop{
  navigator?: boolean;

}

const Logo = ({navigator}:prop) => {
  return (
    <div className="logo">
        <h1 id="Feedstock">FeedStock</h1>
        <h1 id="Plus">Plus</h1>

        {navigator && 
        <LogoNav />
        
          }
    </div>
  )
}

export default Logo
