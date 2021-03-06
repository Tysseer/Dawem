import React from "react";

import Svg, { Circle, Rect, Path, G, Text, Image } from "react-native-svg";
class SVGLoader {
  getDayBadge(bIsDim) {
    if (bIsDim) {
      return (
        <Svg width="100%" height="100%" viewBox="-6 -6 342 342">
          <Circle
            fill="#D0CECE"
            stroke="#333333"
            fillRule="evenodd"
            strokeWidth="12"
            cx="165"
            cy="165"
            r="165"
          />
          <G transform="translate(-178 -119)" fillRule="evenodd">
            <Path
              fill="#333333"
              d="M335 150C335 145.582 338.582 142 343 142L343 142C347.418 142 351 145.582 351 150L351 179C351 183.418 347.418 187 343 187L343 187C338.582 187 335 183.418 335 179Z"
            />
            <Path
              fill="#333333"
              d="M208.5 293C203.806 293 200 289.194 200 284.5L200 284.5C200 279.806 203.806 276 208.5 276L236.5 276C241.194 276 245 279.806 245 284.5L245 284.5C245 289.194 241.194 293 236.5 293Z"
            />
            <Path
              fill="#333333"
              d="M262.601 165.772 268.882 161.766 277.463 175.219 271.182 179.226Z"
            />
            <Path
              fill="#333333"
              d="M214.069 228.903 216.4 221.827 231.556 226.82 229.225 233.896Z"
            />
            <Rect
              fill="#333333"
              x="0"
              y="0"
              width="7.45008"
              height="15.9574"
              transform="matrix(-0.84309 -0.537773 -0.537773 0.84309 425.756 165.772)"
            />
            <Rect
              fill="#333333"
              x="0"
              y="0"
              width="7.45008"
              height="15.9574"
              transform="matrix(-0.405611 -0.914046 -0.914046 0.405611 475.909 225.299)"
            />
            <Path
              fill="#333333"
              d="M451.5 293C446.806 293 443 289.194 443 284.5L443 284.5C443 279.806 446.806 276 451.5 276L479.5 276C484.194 276 488 279.806 488 284.5L488 284.5C488 289.194 484.194 293 479.5 293Z"
            />
            <Path
              fill="#333333"
              d="M343 395C343 390.582 346.582 387 351 387L351 387C355.418 387 359 390.582 359 395L359 424C359 428.418 355.418 432 351 432L351 432C346.582 432 343 428.418 343 424Z"
            />
            <Rect
              fill="#333333"
              x="0"
              y="0"
              width="7.45008"
              height="15.9574"
              transform="matrix(0.84309 0.537773 0.537773 -0.84309 261.43 407.804)"
            />
            <Rect
              fill="#333333"
              x="0"
              y="0"
              width="7.45008"
              height="15.9574"
              transform="matrix(0.312906 0.949784 0.949784 -0.312906 214.85 347.015)"
            />
            <Path
              fill="#333333"
              d="M441.756 397.268 435.475 401.274 426.894 387.821 433.175 383.814Z"
            />
            <Path
              fill="#333F50"
              stroke="#767171"
              strokeWidth="11"
              d="M332.5 353.5C332.5 343.559 340.559 335.5 350.5 335.5L483.5 335.5C493.441 335.5 501.5 343.559 501.5 353.5L501.5 425.5C501.5 435.441 493.441 443.5 483.5 443.5L350.5 443.5C340.559 443.5 332.5 435.441 332.5 425.5Z"
            />
            <Path
              fill="#767171"
              d="M0 0 119.457 0 93.1918 16.5268 16.6147 16.5268 16.6147 64.7117 0 75.1663Z"
              transform="matrix(0.520202 -0.854043 -0.854043 -0.520202 344.195 302.049)"
            />
            <G transform="translate(340 445) rotate(-135)  scale(0.32)">
              <Path
                fill="#939393"
                d="M0 200 v-200 h200 
                            a100,100 90 0,1 0,200
                            a100,100 90 0,1 -200,0
                            z"
              />
            </G>
            <Text
              fill="#FFFFFF"
              fontFamily="Segoe UI,Segoe UI_MSFontService,sans-serif"
              fontWeight="900"
              fontSize="53"
              transform="translate(405.802 410)"
            >
              24
            </Text>
          </G>
        </Svg>
      );
    } else {
      return (
        <Svg width="100%" height="100%" viewBox="-6 -6 342 342">
          <Circle
            stroke="#333333"
            fill="#E1FCFF"
            fillRule="evenodd"
            strokeWidth="12"
            cx="165"
            cy="165"
            r="165"
          />
          <G transform="translate(-178 -119)" fillRule="evenodd">
            <Path
              fill="#333333"
              d="M335 150C335 145.582 338.582 142 343 142L343 142C347.418 142 351 145.582 351 150L351 179C351 183.418 347.418 187 343 187L343 187C338.582 187 335 183.418 335 179Z"
            />
            <Path
              fill="#333333"
              d="M208.5 293C203.806 293 200 289.194 200 284.5L200 284.5C200 279.806 203.806 276 208.5 276L236.5 276C241.194 276 245 279.806 245 284.5L245 284.5C245 289.194 241.194 293 236.5 293Z"
            />
            <Path
              fill="#333333"
              d="M262.601 165.772 268.882 161.766 277.463 175.219 271.182 179.226Z"
            />
            <Path
              fill="#333333"
              d="M214.069 228.903 216.4 221.827 231.556 226.82 229.225 233.896Z"
            />
            <Rect
              fill="#333333"
              x="0"
              y="0"
              width="7.45008"
              height="15.9574"
              transform="matrix(-0.84309 -0.537773 -0.537773 0.84309 425.756 165.772)"
            />
            <Rect
              fill="#333333"
              x="0"
              y="0"
              width="7.45008"
              height="15.9574"
              transform="matrix(-0.405611 -0.914046 -0.914046 0.405611 475.909 225.299)"
            />
            <Path
              fill="#333333"
              d="M451.5 293C446.806 293 443 289.194 443 284.5L443 284.5C443 279.806 446.806 276 451.5 276L479.5 276C484.194 276 488 279.806 488 284.5L488 284.5C488 289.194 484.194 293 479.5 293Z"
            />
            <Path
              fill="#333333"
              d="M343 395C343 390.582 346.582 387 351 387L351 387C355.418 387 359 390.582 359 395L359 424C359 428.418 355.418 432 351 432L351 432C346.582 432 343 428.418 343 424Z"
            />
            <Rect
              fill="#333333"
              x="0"
              y="0"
              width="7.45008"
              height="15.9574"
              transform="matrix(0.84309 0.537773 0.537773 -0.84309 261.43 407.804)"
            />
            <Rect
              fill="#333333"
              x="0"
              y="0"
              width="7.45008"
              height="15.9574"
              transform="matrix(0.312906 0.949784 0.949784 -0.312906 214.85 347.015)"
            />
            <Path
              fill="#333333"
              d="M441.756 397.268 435.475 401.274 426.894 387.821 433.175 383.814Z"
            />
            <Path
              fill="#2F90B2"
              stroke="#50AED0"
              strokeWidth="11"
              d="M332.5 353.5C332.5 343.559 340.559 335.5 350.5 335.5L483.5 335.5C493.441 335.5 501.5 343.559 501.5 353.5L501.5 425.5C501.5 435.441 493.441 443.5 483.5 443.5L350.5 443.5C340.559 443.5 332.5 435.441 332.5 425.5Z"
            />
            <Path
              fill="#2F90B2"
              d="M0 0 119.457 0 93.1918 16.5268 16.6147 16.5268 16.6147 64.7117 0 75.1663Z"
              transform="matrix(0.520202 -0.854043 -0.854043 -0.520202 344.195 302.049)"
            />
            <G transform="translate(340 445) rotate(-135)  scale(0.32)">
              <Path
                fill="#FF0000"
                d="M0 200 v-200 h200 
                        a100,100 90 0,1 0,200
                        a100,100 90 0,1 -200,0
                        z"
              />
            </G>
            <Text
              fill="#FFFFFF"
              fontFamily="Segoe UI,Segoe UI_MSFontService,sans-serif"
              fontWeight="900"
              fontSize="53"
              transform="translate(405.802 410)"
            >
              24
            </Text>
          </G>
        </Svg>
      );
    }
  }

  getMonthBadge(bIsDim) {
    if (bIsDim) {
      return (
        <Svg width="100%" height="100%" viewBox="-6 -6 342 342">
          <Circle
            fill="#D0CECE"
            stroke="#333333"
            fillRule="evenodd"
            strokeWidth="12"
            cx="165"
            cy="165"
            r="165"
          />
          <G transform="translate(-99 -35)">
            <Path
              fill="#DACFCB"
              stroke="#000000"
              strokeWidth="8"
              fillRule="evenodd"
              d="M165 113.016C165 104.17 172.17 97 181.016 97L345.984 97C354.829 97 362 104.17 362 113.016L362 250.984C362 259.83 354.829 267 345.984 267L181.016 267C172.17 267 165 259.83 165 250.984Z"
            />
            <Path
              fill="#877065"
              stroke="#877065"
              strokeWidth="8"
              fillRule="evenodd"
              d="M178.117 97 348.883 97C356.127 97 362 102.873 362 110.117L362 146 165 146 165 110.117C165 102.873 170.873 97 178.117 97Z"
            />
            <Path
              fill="#000000"
              stroke="#FFFFFF"
              strokeWidth="4"
              fillRule="evenodd"
              d="M199 77.5376C199 72.8224 202.822 69 207.538 69L219.462 69C224.178 69 228 72.8224 228 77.5376L228 108.462C228 113.178 224.178 117 219.462 117L207.538 117C202.822 117 199 113.178 199 108.462Z"
            />
            <Path
              fill="#000000"
              stroke="#FFFFFF"
              strokeWidth="4"
              fillRule="evenodd"
              d="M298 77.5376C298 72.8224 301.822 69 306.538 69L318.462 69C323.178 69 327 72.8224 327 77.5376L327 108.462C327 113.178 323.178 117 318.462 117L306.538 117C301.822 117 298 113.178 298 108.462Z"
            />
            <G transform="translate(260 350) rotate(-135)  scale(0.36)">
              <Path
                fill="#939393"
                d="M0 200 v-200 h200 
                    a100,100 90 0,1 0,200
                    a100,100 90 0,1 -200,0
                    z"
              />
            </G>
            <Text
              fill="#757171"
              fontFamily="Segoe UI,Segoe UI_MSFontService,sans-serif"
              fontWeight="900"
              fontSize="88"
              transform="translate(210.837 226)"
            >
              30
            </Text>
          </G>
        </Svg>
      );
    } else {
      return (
        <Svg width="100%" height="100%" viewBox="-6 -6 342 342">
          <Circle
            stroke="#333333"
            fill="#E1FCFF"
            fillRule="evenodd"
            strokeWidth="12"
            cx="165"
            cy="165"
            r="165"
          />
          <G transform="translate(-99 -35)">
            <Path
              fill="#FFFFFF"
              stroke="#000000"
              strokeWidth="8"
              fillRule="evenodd"
              d="M165 113.016C165 104.17 172.17 97 181.016 97L345.984 97C354.829 97 362 104.17 362 113.016L362 250.984C362 259.83 354.829 267 345.984 267L181.016 267C172.17 267 165 259.83 165 250.984Z"
            />
            <Path
              fill="#DD4400"
              stroke="#DD4400"
              strokeWidth="8"
              fillRule="evenodd"
              d="M178.117 97 348.883 97C356.127 97 362 102.873 362 110.117L362 146 165 146 165 110.117C165 102.873 170.873 97 178.117 97Z"
            />
            <Path
              fill="#000000"
              stroke="#FFFFFF"
              strokeWidth="4"
              fillRule="evenodd"
              d="M199 77.5376C199 72.8224 202.822 69 207.538 69L219.462 69C224.178 69 228 72.8224 228 77.5376L228 108.462C228 113.178 224.178 117 219.462 117L207.538 117C202.822 117 199 113.178 199 108.462Z"
            />
            <Path
              fill="#000000"
              stroke="#FFFFFF"
              strokeWidth="4"
              fillRule="evenodd"
              d="M298 77.5376C298 72.8224 301.822 69 306.538 69L318.462 69C323.178 69 327 72.8224 327 77.5376L327 108.462C327 113.178 323.178 117 318.462 117L306.538 117C301.822 117 298 113.178 298 108.462Z"
            />
            <G transform="translate(260 350) rotate(-135)  scale(0.36)">
              <Path
                fill="#FF0000"
                d="M0 200 v-200 h200 
                a100,100 90 0,1 0,200
                a100,100 90 0,1 -200,0
                z"
              />
            </G>
            <Text
              fill="#1F1F1F"
              fontFamily="Segoe UI,Segoe UI_MSFontService,sans-serif"
              fontWeight="900"
              fontSize="88"
              transform="translate(210.837 226)"
            >
              30
            </Text>
          </G>
        </Svg>
      );
    }
  }

  getWeekBadge(bIsDim) {
    if (bIsDim) {
      return (
        <Svg width="100%" height="100%" viewBox="-6 -6 342 342">
          <Circle
            fill="#D0CECE"
            stroke="#333333"
            fillRule="evenodd"
            strokeWidth="12"
            cx="165"
            cy="165"
            r="165"
          />
          <Image
            x="8%"
            y="3%"
            width="88%"
            height="88%"
            href={require("../../assets/images/trophy_dim.png")}
          />
          <G transform="translate(-99 -35)">
            <G transform="translate(250 355) rotate(-135)  scale(0.35)">
              <Path
                fill="#939393"
                d="M0 200 v-200 h200 
               a100,100 90 0,1 0,200
               a100,100 90 0,1 -200,0
               z"
              />
            </G>
          </G>
        </Svg>
      );
    } else {
      return (
        <Svg width="100%" height="100%" viewBox="-6 -6 342 342">
          <Circle
            stroke="#333333"
            fill="#E1FCFF"
            fillRule="evenodd"
            strokeWidth="12"
            cx="165"
            cy="165"
            r="165"
          />
          <Image
            x="8%"
            y="3%"
            width="88%"
            height="88%"
            href={require("../../assets/images/trophy.png")}
          />

          <G transform="translate(-99 -35)">
            <G transform="translate(250 355) rotate(-135)  scale(0.35)">
              <Path
                fill="#FF0000"
                d="M0 200 v-200 h200 
               a100,100 90 0,1 0,200
               a100,100 90 0,1 -200,0
               z"
              />
            </G>
          </G>
        </Svg>
      );
    }
  }

  getDeleteIcon() {
    return (
      <Svg key={1} viewBox="0 0 24 24" width="80%" height="80%">
        <Rect
          fill="#222266"
          width="12.332833"
          height="4.1663334"
          x="5.8330002"
          y="10.4165"
        />
        <Path
          fill="#E15019"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"
        />
      </Svg>
    );
  }

  getReadIcon() {
    return (
      <Svg key={2} fill="#99FF67" viewBox="0 0 24 24" width="80%" height="80%">
        <Path d="M21,5c-1.11-0.35-2.33-0.5-3.5-0.5c-1.95,0-4.05,0.4-5.5,1.5c-1.45-1.1-3.55-1.5-5.5-1.5S2.45,4.9,1,6v14.65 c0,0.25,0.25,0.5,0.5,0.5c0.1,0,0.15-0.05,0.25-0.05C3.1,20.45,5.05,20,6.5,20c1.95,0,4.05,0.4,5.5,1.5c1.35-0.85,3.8-1.5,5.5-1.5 c1.65,0,3.35,0.3,4.75,1.05c0.1,0.05,0.15,0.05,0.25,0.05c0.25,0,0.5-0.25,0.5-0.5V6C22.4,5.55,21.75,5.25,21,5z M21,18.5 c-1.1-0.35-2.3-0.5-3.5-0.5c-1.7,0-4.15,0.65-5.5,1.5V8c1.35-0.85,3.8-1.5,5.5-1.5c1.2,0,2.4,0.15,3.5,0.5V18.5z" />
        <Path d="M17.5,10.5c0.88,0,1.73,0.09,2.5,0.26V9.24C19.21,9.09,18.36,9,17.5,9c-1.7,0-3.24,0.29-4.5,0.83v1.66 C14.13,10.85,15.7,10.5,17.5,10.5z" />
        <Path d="M13,12.49v1.66c1.13-0.64,2.7-0.99,4.5-0.99c0.88,0,1.73,0.09,2.5,0.26V11.9c-0.79-0.15-1.64-0.24-2.5-0.24 C15.8,11.66,14.26,11.96,13,12.49z" />
        <Path d="M17.5,14.33c-1.7,0-3.24,0.29-4.5,0.83v1.66c1.13-0.64,2.7-0.99,4.5-0.99c0.88,0,1.73,0.09,2.5,0.26v-1.52 C19.21,14.41,18.36,14.33,17.5,14.33z" />
      </Svg>
    );
  }
  getEditIcon() {
    return (
      <Svg key={3} viewBox="0 0 24 24" width="80%" height="80%">
        <Path
          fill="#002B3C"
          d="M22,24H2v-4h20V24z M13.06,5.19l3.75,3.75L7.75,18H4v-3.75L13.06,5.19z M17.88,7.87l-3.75-3.75 l1.83-1.83c0.39-0.39,1.02-0.39,1.41,0l2.34,2.34c0.39,0.39,0.39,1.02,0,1.41L17.88,7.87z"
          enable-background="new"
        />
      </Svg>
    );
  }

  getRevisedIcon(bIsDone) {
    if (bIsDone == true) {
      return (
        <Svg key={4} viewBox="0 0 24 24" width="80%" height="80%">
          <Path
            fill="#88FF22"
            d="M23,12l-2.44-2.79l0.34-3.69l-3.61-0.82L15.4,1.5L12,2.96L8.6,1.5L6.71,4.69L3.1,5.5L3.44,9.2L1,12l2.44,2.79l-0.34,3.7 l3.61,0.82L8.6,22.5l3.4-1.47l3.4,1.46l1.89-3.19l3.61-0.82l-0.34-3.69L23,12z M10.09,16.72l-3.8-3.81l1.48-1.48l2.32,2.33 l5.85-5.87l1.48,1.48L10.09,16.72z"
          />
        </Svg>
      );
    } else {
      return (
        <Svg key={5} viewBox="0 0 24 24" width="80%" height="80%">
          <Path
            fill="#08FF6B"
            d="M15.5,13.5c0,2-2.5,3.5-2.5,5h-2c0-1.5-2.5-3-2.5-5c0-1.93,1.57-3.5,3.5-3.5h0C13.93,10,15.5,11.57,15.5,13.5z M13,19.5h-2 V21h2V19.5z M19,13c0,1.68-0.59,3.21-1.58,4.42l1.42,1.42C20.18,17.27,21,15.23,21,13c0-2.74-1.23-5.19-3.16-6.84l-1.42,1.42 C17.99,8.86,19,10.82,19,13z M16,5l-4-4v3c0,0,0,0,0,0c-4.97,0-9,4.03-9,9c0,2.23,0.82,4.27,2.16,5.84l1.42-1.42 C5.59,16.21,5,14.68,5,13c0-3.86,3.14-7,7-7c0,0,0,0,0,0v3L16,5z"
          />
        </Svg>
      );
    }
  }
}
export default SVGLoader;
