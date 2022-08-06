import React from 'react'

export default function Navbar(props) {
    function OpenSignUpPage() {

        window.location.href = "/UserInfo";

    }
    function OpenLoginPage() {

        window.location.href = "/loginInfo";

    }

    return (
        <div className='navigation'>
            <a href="/" >{props.title}</a>
            <a href="/MovieList.js" >{props.movies}</a>
            <a href="/" >{props.orders}</a>
            <div onClick={OpenSignUpPage}>
                {props.signup}
            </div>
            <div onClick={OpenLoginPage}>
                {props.signin}
            </div>

            <a href="/" >{props.admin}</a>

        </div>
    )
}


export { Navbar };

