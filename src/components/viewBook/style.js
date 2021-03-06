import styled from 'styled-components'

export const NavigatePage = styled.div`
    width:100%;
    height:40px;
    display:flex;
    align-items: center;
    justify-content:center;
    background-color:#5A5A5A;
    color:white;
    ${(props) => (props.stick ? 'position: fixed; top: 0; z-index:1; width:80%;' : null)}
`
export const PageContain = styled.div`
    width:100%;
    min-height:720px;
    overflow: scroll;
    display:flex;
    align-items: center;
    justify-content: center;
    background-color:#3C3C3C;
`

export const PageButton = styled.button`
    background: none;
    display: inline;
    border: none;
    font-size: 16px;
    color: white;
    cursor:pointer;
    vertical-align:middle;
    &:hover {
      color: #4DC8C5;
  }
    &:disabled {
        color: #c4c4c4;
        cursor:context-menu;
    }
`
export const PageInput = styled.input`
    background-color: #3c3c3c;
    display:inline;
    text-align:center;
    width: 20px;
    border: 1px solid #3c3c3c;
    padding:5px;
    margin:5px;
    color:white;
    ::-webkit-inner-spin-button{
        -webkit-appearance: none; 
        margin: 0; 
    }
    ::-webkit-outer-spin-button{
        -webkit-appearance: none; 
        margin: 0; 
    }    
    &:focus {
        background-color: white;
        color:#3c3c3c;

    }
`

export const ZoomSelector = styled.select`
    margin-left:auto;
    margin-right:10px;
`
export const Top = styled.div`
    margin-top:100px;

`
export const Inline = styled.div`
    margin-left:auto;
`

export const ShowMore = styled.div`

`

export const ShowButton = styled.button`
    width:100%;
    background: none;
    display: inline;
    border: none;
    font-size: 16px;
    color: #10A0A2;
    cursor:pointer;
    vertical-align:middle;
    &:hover {
      color: #4DC8C5;
  }
`
export default { }
