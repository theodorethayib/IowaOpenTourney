import React, {useRef, useState, Component, useEffect} from "react";
import {
    SingleEliminationBracket,
    DoubleEliminationBracket,
    Match,
    MATCH_STATES,
    SVGViewer
} from '@g-loot/react-tournament-brackets';
import defaultTheme from "../Themes/defaultTheme";
import {useSelector, useDispatch} from "react-redux";
import {updateMatches} from "../../features/singles/singlesSlice";

function SinglesBracket1({}) {
    const dispatch = useDispatch()
    const matchArray = structuredClone(useSelector((state) => state.singles.matches));

    const [width, height] = [1920, 1080];
    const finalWidth = Math.max(width - 50, 500);
    const finalHeight = Math.max(height - 100, 500);


    return (
        <div>
            {matchArray.length > 0 && (<>{matchArray.length}<SingleEliminationBracket
                matches={matchArray}
                options={{
                    style: {
                        roundHeader: {backgroundColor: '#AAA'},
                        connectorColor: '#FF8C00',
                        connectorColorHighlight: '#000',
                    },
                }}
                theme={defaultTheme}
                svgWrapper={({children, ...props}) => (
                    <SVGViewer
                        // background="#FFF"
                        // SVGBackground="#FFF"
                        width={finalWidth}
                        height={finalHeight}
                        {...props}
                    >
                        {children}
                    </SVGViewer>
                )}
                matchComponent={({
                                     match,
                                     onMatchClick,
                                     onPartyClick,
                                     onMouseEnter,
                                     onMouseLeave,
                                     topParty,
                                     bottomParty,
                                     topWon,
                                     bottomWon,
                                     topHovered,
                                     bottomHovered,
                                     topText,
                                     bottomText,
                                     connectorColor,
                                     computedStyles,
                                     teamNameFallback,
                                     resultFallback,
                                 }) => (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                            color: '#000',
                            width: '100%',
                            height: '100%',
                        }}

                    >
                        <div
                            onMouseEnter={() => onMouseEnter(topParty.id)}
                            style={{display: 'flex'}}
                            onMouseUp={() => {
                                alert("TEST")
                                alert(topParty.name)
                                console.log(match);
                            }}
                        >
                            <div>{topParty.name || teamNameFallback}</div>
                            <div>{topParty.resultText ?? resultFallback(topParty)}</div>
                        </div>
                        <div
                            style={{height: '1px', width: '100%', background: '#FF8C00'}}
                        />
                        <div
                            onMouseEnter={() => onMouseEnter(bottomParty.id)}
                            style={{display: 'flex'}}
                        >
                            <div>{bottomParty.name || teamNameFallback}</div>
                            <div>{bottomParty.resultText ?? resultFallback(topParty)}</div>
                        </div>
                    </div>
                )}
            /></>)}

        </div>
    );
}

export default SinglesBracket1;
