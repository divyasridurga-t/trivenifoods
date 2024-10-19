import data from "../Utils/recepies.json";

const Menu = () => {

  function handleClick(title){

    
  }

  return (
    <>
      <div className="body_container">
        {data.map((item, index) => {
          let recipe_name = item?.title?.toLowerCase()?.split(" ")?.join("-");
          let url = `/${recipe_name}/${item.id}`;
          return (
            <a href={url}>
              <div className="card" key={index}>
                <div className="img_container">
                  <img width="250" height="220" src={`/${item.image}`} />
                </div>
                <div className="recipe_des">
                  <div className="recipe_name">
                    {item.title} / {item.telugu_title}
                  </div>
                  <div>
                    {/* <p className="price">price</p> */}
                    <button onClick={()=>handleClick(item.title)} className="order_now_btn">Order Now</button>
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </>
  );
};

export default Menu;
