import PageTitle from "@components/data-display/PageTitle"
import useIndex from "@data/hooks/pages/useIndex"
import { Button, Icon, TextField } from "@mui/material"
import { BoxButtons, HomeContainer } from "@styles/pages/index.styles"

export default function Home() {
  const {messageError,SetSearch, onBuscarProfessor} = useIndex();
  return (
    <HomeContainer onSubmit={onBuscarProfessor}>
      <PageTitle 
        title="Encontre o professor ideal para você!" 
        subtitle="Pesquise pelo professor ideal para você"
      />
      <TextField
        sx={{mt:3, mb:1}}
        label={"Encontre um Professor"}
        InputProps={{
          startAdornment:<Icon sx={{mr: 1}}>search</Icon>,
        }}
        error={messageError.length > 0}
        helperText={messageError}
        onChange={({target:{value}}) => SetSearch(value)}
        fullWidth
        required
      />
      <BoxButtons>
        <Button type="submit" variant="contained">
          Buscar o professor perfeito
        </Button>
      </BoxButtons>
    </HomeContainer>
  )
}
