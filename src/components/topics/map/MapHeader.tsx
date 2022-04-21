import { Button, Center, Link, Stack, Text } from '@chakra-ui/react';
import React, { Children } from 'react';
import { MapIcon } from '../../lib/icons/MapIcon';

export enum MapType {
  SUBTOPICS = 'SUBTOPICS',
  CONCEPTS = 'CONCEPTS',
  PREREQUISITES = 'PREREQUISITES',
}

export const MapHeader: React.FC<{ onChange: (mapType: MapType) => void; value: MapType; size: 'lg' | 'sm' }> = ({
  onChange,
  size,
  value,
}) => {
  return (
    <Stack direction="row" alignItems="stretch" spacing={1}>
      <Center p={1}>
        <MapIcon boxSize={{ sm: 6, lg: 8 }[size]} color="gray.800" />
      </Center>
      <Stack direction="row" alignItems="stretch" spacing={1} pt="3px">
        {Object.values(MapType).map((mapType, idx) => (
          <React.Fragment key={mapType}>
            {idx !== 0 && (
              <Center>
                <Text fontSize={{ sm: 'lg', lg: 'xl' }[size]}>|</Text>
              </Center>
            )}
            <Center>
              <MapTypeMenuItem onSelect={() => onChange(mapType)} isSelected={mapType === value} size={size}>
                {mapType}
              </MapTypeMenuItem>
            </Center>
          </React.Fragment>
        ))}
      </Stack>
    </Stack>
  );
};

const MapTypeMenuItem: React.FC<{ onSelect: () => void; isSelected?: boolean; size: 'lg' | 'sm' }> = ({
  size,
  isSelected,
  onSelect,
  children,
}) => {
  return (
    <Link
      onClick={onSelect}
      _hover={{}}
      fontSize={{ sm: 'lg', lg: 'xl' }[size]}
      lineHeight="18px"
      fontWeight={500}
      color={isSelected ? 'blue.600' : 'gray.800'}
    >
      {children}
    </Link>
  );
};
