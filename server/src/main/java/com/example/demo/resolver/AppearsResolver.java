package com.example.demo.resolver;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import com.coxautodev.graphql.tools.GraphQLResolver;
import java.util.List;
import com.example.demo.dao.entity.*;
import com.example.demo.dao.entity.Character;
import org.springframework.stereotype.Component;
import com.example.demo.dao.repository.*;
@Component
public class AppearsResolver implements GraphQLResolver <Appears>{
private final EpisodeRepository episodeRepository;
	public AppearsResolver(final EpisodeRepository episodeRepository){
		this.episodeRepository = episodeRepository;
	}
	public List<Episode> getEpisode(Appears appears,final String identifier,final String code){
		List<Episode> join = new ArrayList<Episode>();
			if (identifier!=null){
				String id1=identifier.substring(identifier.lastIndexOf('/') + 1,identifier.length());
				join=episodeRepository.findAllByAppearsAndId(appears, id1);
			}else if (code!=null){
				join=episodeRepository.findAllByAppearsAndCode(appears,code);
			}else{
				join=episodeRepository.findAllByAppears(appears);
			}
			return join;
		}

}
