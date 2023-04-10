### │ 소개

React 기반의 프레임워크인 Gatsby와 open api인 Fake store를 이용해 만든 쇼핑몰 웹 사이트입니다.

<br />

### │ Link

**🔗 github**

[https://github.com/ziynii/project__f-shop-v2](https://github.com/ziynii/project__f-shop-v2)

🔗 **project site**

[https://main--extraordinary-semifreddo-05c739.netlify.app/](https://main--extraordinary-semifreddo-05c739.netlify.app/)


<br />

### │ 주요기능
1. 상품 가격순 정렬
2. 장바구니 담기
3. 결제 시 쿠폰 적용

<br />

### │ Skill

🔸 **React**

 React 기반의 프레임워크로 정적인 사이트를 만드는 데 유용하다고 알고 있어 쇼핑몰 프로젝트에 적용하였습니다.

🔸 **TypeScript**

 타입스크립트를 이용해 타입에 대한 에러를 방지하고 가독성을 높였습니다

🔸 **Styled-Component**

 Styled-Component로 스타일 작업을 진행했습니다

🔸 **React helmet**

 React-helmet을 이용해 페이지 이동시 타이틀이 변경되도록 제작했습니다
 
🔸 **Contentful**

 Contentful을 이용해 데이터를 코드와 분리해 관리하고 graphql로 contentful 데이터를 불러와 작업했습니다.


<br />


### │ Desktop

**🔸 홈**

  <img src="https://user-images.githubusercontent.com/85431762/230963322-cab33fa7-d7da-40fc-a19f-93d9bd414ab7.JPG" alt="초기화면" width="700px"/>
  
  **🔸 카테고리 전체보기**
  
  <img src="https://user-images.githubusercontent.com/85431762/230963507-61efdd8c-907e-4708-aefc-b1c0edb5054c.JPG" alt="카테고리" width="700px"/>
  
  **🔸 상품 상세페이지**
  
  <img src="https://user-images.githubusercontent.com/85431762/230963602-fd0fe5ad-6897-4fae-beb4-bcb8d098c62e.JPG" alt="상세페이지" width="700px"/>

   
  **🔸 장바구니**
  
  <img src="https://user-images.githubusercontent.com/85431762/230963657-1a6a335a-ff4a-4bf4-bc53-49449b91e175.JPG" alt="장바구니" width="700px"/>


<br />

### │ Tablet




**🔸 홈**

  <img src="https://user-images.githubusercontent.com/85431762/230964226-eaac9cce-53c9-4358-b8d6-38defff82d7b.JPG" alt="초기화면" width="500px"/>
  
  **🔸 카테고리 전체보기**
  
  <img src="https://user-images.githubusercontent.com/85431762/230964220-76c21ad5-c2c5-4444-9d48-79dbc102cb0d.JPG" alt="카테고리" width="500px"/>
  
  **🔸 상품 상세페이지**
  
  <img src="https://user-images.githubusercontent.com/85431762/230964223-33d10aa1-315d-456f-9c1e-dd12dd46bbc6.JPG" alt="상세페이지" width="500px"/>

   
  **🔸 장바구니**
  
  <img src="https://user-images.githubusercontent.com/85431762/230964217-15a10d8f-f69f-428e-8ab7-fed819e99d10.JPG" alt="장바구니" width="500px"/>


<br />


### │ Mobile

**🔸 홈**

  <img src="https://user-images.githubusercontent.com/85431762/230964214-edca2ae0-dcc7-4f91-b7ce-df2e8a975ed3.JPG" alt="초기화면" width="400px"/>
  
  **🔸 카테고리 전체보기**
  
  <img src="https://user-images.githubusercontent.com/85431762/230964209-e9cb9c2c-c809-44cd-9de3-62c329f4cf69.JPG" alt="카테고리" width="400px"/>
  
  **🔸 상품 상세페이지**
  
  <img src="https://user-images.githubusercontent.com/85431762/230964212-36b50de1-8112-4185-9887-5957722e9b2c.JPG" alt="상세페이지" width="400px"/>

   
  **🔸 장바구니**
  
  <img src="https://user-images.githubusercontent.com/85431762/230964201-c8c3edb3-d6f9-4011-b996-46a4019b4aba.JPG" alt="장바구니" width="400px"/>



<br />





### 🌟 Error & Solution

☑️ **Window is not defined**

**[ ERROR ]**

gatsby를 배포하는 과정에서 window가 정의되지 않았다는 오류가 발생했습니다.

**[ SOLUTION ]**

Gatsby의 build 환경은 node.js로 node.js 환경에는 window, document 같은 브라우저 전역이 존재하지 않아 생기는 오류로, typeof로 아래와 같이 window의 존재 여부를 체크하는 코드를 추가했습니다.
```jsx
const pathname = **typeof window !== 'undefined' &&** window.location.pathname;
```
[[🔗참고한 사이트]](https://www.gatsbyjs.com/docs/debugging-html-builds/)
