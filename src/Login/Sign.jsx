import React,{useState} from "react";
import { useRegisterUserMutation } from '../Fetch_Api/Service/User_Auth_Api'
import { storeToken } from '../Fetch_Api/Service/LocalStorageServices';
import { useNavigate, Link } from 'react-router-dom';
import style from './style.module.scss'

const Sign = () => {
  const [server_error, setServerError] = useState({});
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      password2: data.get("password2"),
      tc: data.get("tc"),
    };
    const res = await registerUser(actualData);
    if (res.error) {
      setServerError(res.error.data.errors);
    }
    if (res.data) {
      storeToken(res.data.token);
      navigate("/");
    }
  };
  return (
    <>
    <div style={{height: "120vh"}} className={style.login}>
    <form action="#" className={style.form} onSubmit={handleSubmit}>
    <div className={style.icon_logo}>
        <img src="meta.png" alt="" />
        <h1>genzcoder</h1>
      </div>
      <div className={style.flex_column}>
        <label  className={style.flex_columnlabel}>User Name </label>
      </div>
      <div className={style.inputForm} style={{border: `${ server_error.non_field_errors || server_error.name ? "1px solid Red" :""}`}}>
        <svg width="24px"  height="24px"  viewBox="0 0 24 24"  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <g id="Iconly/Light/Profile" stroke="#000000"  strokeWidth="1"  fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                <g id="Profile" transform="translate(4.814286, 2.814476)" stroke="#000000" >
                    <path d="M7.17047619,12.531714 C3.30285714,12.531714 -4.08562073e-14,13.1164759 -4.08562073e-14,15.4583807 C-4.08562073e-14,17.8002854 3.28190476,18.4059997 7.17047619,18.4059997 C11.0380952,18.4059997 14.34,17.8202854 14.34,15.479333 C14.34,13.1383807 11.0590476,12.531714 7.17047619,12.531714 Z" id="Stroke-1" strokeWidth="1.4" ></path>
                    <path d="M7.17047634,9.19142857 C9.70857158,9.19142857 11.7657144,7.13333333 11.7657144,4.5952381 C11.7657144,2.05714286 9.70857158,-5.32907052e-15 7.17047634,-5.32907052e-15 C4.6323811,-5.32907052e-15 2.574259,2.05714286 2.574259,4.5952381 C2.56571443,7.1247619 4.60952396,9.18285714 7.13809539,9.19142857 L7.17047634,9.19142857 Z" id="Stroke-3" strokeWidth="1.4" ></path>
                </g>
            </g>
        </svg>
        <input placeholder="Enter User Name" className={style.input} type="text" name="name" required/>
      </div>

      <div className={style.flex_column}>
        <label  className={style.flex_columnlabel}>Email </label>
      </div>
      <div className={style.inputForm} style={{border: `${ server_error.non_field_errors || server_error.email ? "1px solid Red" :""}`}}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          viewBox="0 0 32 32"
          height="20"
        >
          <g data-name="Layer 3" id="Layer_3">
            <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
          </g>
        </svg>
        <input placeholder="Enter your Email" className={style.input} type="text" name="email" required/>
      </div>

      <div className={style.flex_column}>
        <label className={style.flex_columnlabel}>Password </label>
      </div>
      <div className={style.inputForm} style={{border: `${ server_error.non_field_errors || server_error.password ? "1px solid Red" :""}`}}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          viewBox="-64 0 512 512"
          height="20"
        >
          <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
          <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
        </svg>
        <input
          placeholder="Enter your Password"
          className={style.input}
          type="password"
          name="password"
          required
        />
      </div>

      <div className={style.flex_column}>
        <label className={style.flex_columnlabel}>Comfirm Password </label>
      </div>
      <div className={style.inputForm} style={{border: `${ server_error.non_field_errors || server_error.password2  ? "1px solid Red" :""}`}}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          viewBox="-64 0 512 512"
          height="20"
        >
          <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
          <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
        </svg>
        <input
          placeholder="Enter your Password"
          className={style.input}
          type="password"
          name="password2"
          required
        />
      </div>

      <div className={style.flex_row}>
        <div className={style.displayflex}>
          <div className={style.content}>
              <label style={{boxShadow: `${ server_error.non_field_errors || server_error.tc  ? "0px 0px 0px 1px rgb(255 0 0 / 68%)" :""}`}} className={style.checkBox}>
                  <input id={style.ch1} name="tc" type="checkbox"/>
                  <div className={style.transition}></div>
              </label>
          </div>
          <label className={style.flex_rowlabel} >Terms and Conditions</label>
        </div>
      </div>
      {<p className={`${style.p} ${style.line}`}>{server_error.non_field_errors || server_error.password || server_error.email || server_error.name }</p>}
     {isLoading ? <button disabled style={{background:'#151717f2'}} className={style.button_submit}><svg className={style.svg_loader} viewBox="25 25 50 50"><circle className={style.svgcircle} r="20" cy="50" cx="50"></circle></svg></button> : <button className={style.button_submit}>Create Account</button>}
      <p className={style.p}>
        Already have an account? <Link to="/login" className={style.span}>Sign In</Link>
      </p>
      <p className={`${style.p}`}>Or With</p>

      <div className={style.flex_row}>
        <button className={`${style.btn} ${style.google}`}>
          Google
        </button>
        <button className={`${style.btn} ${style.apple}`}>
          <svg
            xmlSpace="preserve"
            style={{enablebBackground:"new 0 0 22.773 22.773"}}
            viewBox="0 0 22.773 22.773"
            y="0px"
            x="0px"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg"
            id="Capa_1"
            width="20"
            height="20"
            version="1.1"
          >
            <g>
              <g>
                <path d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573 c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z"></path>{" "}
                <path d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334 c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0 c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019 c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464 c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648 c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z"></path>{" "}
              </g>
            </g>
          </svg>
          Apple
        </button>
      </div>
    </form>
  </div>
  </>
  )
}

export default Sign
