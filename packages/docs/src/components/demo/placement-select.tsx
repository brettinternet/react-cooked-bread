/** @jsx jsx */
import React from 'react'
import { Placement, PlacementOption } from 'react-cooked-bread'
import { Box, Flex } from 'reflexbox'
import { jsx } from '@emotion/core'

export const placements: PlacementOption[] = [
  Placement.TOP_LEFT,
  Placement.TOP_CENTER,
  Placement.TOP_RIGHT,
  Placement.BOTTOM_LEFT,
  Placement.BOTTOM_CENTER,
  Placement.BOTTOM_RIGHT,
]

type PlacementButtonProps = {
  placement: PlacementOption
  onClick: () => void
  isActive: boolean
}

const PlacementButton: React.FC<PlacementButtonProps> = ({ placement, onClick, isActive }) => (
  <div>
    <button
      id={`position-${placement}`}
      disabled={isActive}
      onClick={onClick}
      css={(theme) => ({
        width: 110,
        border: `1px solid ${isActive ? theme.colors.grayLight : 'transparent'}`,
        background: isActive ? theme.colors.bgCode : 'transparent',
      })}
    >
      {placement}
    </button>
  </div>
)

type PlacementSelectProps = {
  placement: PlacementOption
  setPlacement: (placement: PlacementOption) => void
}

export const PlacementSelect: React.FC<PlacementSelectProps> = ({ placement, setPlacement }) => {
  return (
    <div>
      <Box mb={2}>
        <label htmlFor={`position-${placement}`}>Placement:</label>
      </Box>
      <Flex>
        <Flex flexDirection="column" width="auto" p={1} css={{ border: '1px solid black' }}>
          <Flex alignItems="center" flexWrap="wrap">
            {placements.slice(0, 3).map((place) => (
              <PlacementButton
                key={place}
                placement={place}
                onClick={() => {
                  setPlacement(place)
                }}
                isActive={place === placement}
              />
            ))}
          </Flex>
          <Flex alignItems="center" flexWrap="wrap">
            {placements.slice(3).map((place) => (
              <PlacementButton
                key={place}
                placement={place}
                onClick={() => {
                  setPlacement(place)
                }}
                isActive={place === placement}
              />
            ))}
          </Flex>
        </Flex>
      </Flex>
    </div>
  )
}
