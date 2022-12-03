const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("8-ball")
    .setDescription("Haz una pregunta y el bot te responderá SI o NO")
    .addStringOption((option) =>
      option
        .setName("pregunta")
        .setDescription("La pregunta que le vas a hacer al bot")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const { user, options } = interaction;
    await user.fetch()
    console.log(user)
    const question = options.getString("pregunta");
    if (!question.endsWith('?')) return interaction.reply({ content: 'Debes escribir una pregunta', ephemeral: true })
    const opciones = [
      "Si",
      "No",
      "Probablemente",
      "Probablemente no",
    ];
    const opcion = Math.floor(Math.random() * opciones.length);
    const answer = opciones[opcion];
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`Pregunta de ${user.username}`)
          .setDescription(`${question}`)
          .setThumbnail(user.displayAvatarURL({dynamic: true}))
          .setColor(user.hexAccentColor || "Random")
          .addFields([{ name: "🎱 | Respuesta", value: `\`${answer}\`` }]),
      ],
    });
  },
};
