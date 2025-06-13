import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AssetTable = ({ coin = [], category }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`overflow-y-auto overflow-x-hidden px-4 ${
        category === 'all' ? 'h-[77.3vh]' : 'h-[82vh]'
      }`}
    >
      <Table className="w-full table-fixed border-separate border-spacing-y-2">
        <TableHeader>
          <TableRow className="bg-muted rounded-md text-white/80">
            <TableHead className="w-[130px] px-4 py-2">Coin</TableHead>
            <TableHead className="px-4 py-2">SYMBOL</TableHead>
            <TableHead className="w-[130px] px-4 py-2">VOLUME</TableHead>
            <TableHead className="w-[130px] px-4 py-2">MARKET CAP</TableHead>
            <TableHead className="px-5 py-3">24h</TableHead>
            <TableHead className="text-right px-4 py-2">PRICE</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {coin.map((item) => (
            <TableRow
              key={item.id}
              className="cursor-pointer text-gray-300 hover:text-white hover:bg-white/10 transition-all rounded-md"
              onClick={() => navigate(`/market/${item.id}`)}
            >
              <TableCell className="px-4 py-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={item.image} />
                  </Avatar>
                  <div className="flex flex-col whitespace-normal leading-tight">
                    <span className="font-medium break-words">{item.name}</span>
                  </div>
                </div>
              </TableCell>

              <TableCell className="px-4 py-2">{item.symbol.toUpperCase()}</TableCell>
              <TableCell className="px-4 py-2">{item.total_volume?.toLocaleString()}</TableCell>
              <TableCell className="px-4 py-2">{item.market_cap?.toLocaleString()}</TableCell>

              <TableCell
                className={`px-4 py-2 ${
                  item.price_change_percentage_24h < 0 ? 'text-red-500' : 'text-green-500'
                }`}
              >
                {item.price_change_percentage_24h?.toFixed(2)}%
              </TableCell>

              <TableCell className="text-right px-4 py-2">
                ${item.current_price?.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AssetTable;
