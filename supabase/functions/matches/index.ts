import { HLTV } from 'npm:hltv@3.5.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const hltv = HLTV.createInstance();
    
    // Buscar próximos eventos
    const events = await hltv.getEvents();
    
    // Filtrar eventos que a FURIA participa
    const furiaEvents = events.filter(event => 
      event.teams?.some(team => team.name === 'FURIA')
    );

    return new Response(
      JSON.stringify(furiaEvents.map(event => ({
        id: event.id,
        name: event.name,
        league: event.type || 'Não especificada',
        begin_at: event.dateStart,
        prize_pool: event.prizePool,
        location: event.location?.name || 'Local não especificado'
      }))),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Edge function error:', error);

    return new Response(
      JSON.stringify({
        error: 'Failed to fetch tournaments data',
        details: error.message
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});